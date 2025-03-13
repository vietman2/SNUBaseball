from django.core.exceptions import ObjectDoesNotExist
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import transaction
from io import BytesIO
from PIL import Image as PILImage
from rest_framework import serializers

from core.storage import get_presigned_url
from person.member.models import Member
from person.member.serializers import MemberMiniSerializer
from .enums import MediaType
from .models import BaseMedia, Image, Video, Album, Tag
from .utils import create_video_thumbnail_and_duration, create_image_thumbnail

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class MediaSerializer(serializers.ModelSerializer):
    """
        목록 조회 시, 기본정보를 제공하는 Serializer
    """
    url     = serializers.SerializerMethodField()
    length  = serializers.SerializerMethodField()
    type    = serializers.SerializerMethodField()
    width   = serializers.SerializerMethodField()
    height  = serializers.SerializerMethodField()

    class Meta:
        model = BaseMedia
        fields = ['id', 'url', 'length', 'type', 'width', 'height']

    def get_url(self, obj):
        if obj.type == MediaType.IMAGE:
            if obj.image.thumbnail:
                return get_presigned_url(obj.image.thumbnail)
            return get_presigned_url(obj.image.file)

        ## return the thumbnail of the video
        return get_presigned_url(obj.video.thumbnail)

    def get_length(self, obj):
        if obj.type == MediaType.VIDEO:
            return obj.video.duration

        return None

    def get_type(self, obj):
        return obj.get_type_display()

    def get_width(self, obj):
        if obj.type == MediaType.IMAGE:
            return obj.image.file.width

        return None

    def get_height(self, obj):
        if obj.type == MediaType.IMAGE:
            return obj.image.file.height

        return None

class BaseMediaDetailsSerializer(serializers.ModelSerializer):
    url             = serializers.SerializerMethodField()
    album           = serializers.SerializerMethodField()
    tags            = serializers.SerializerMethodField()
    people          = serializers.SerializerMethodField()
    title           = serializers.SerializerMethodField()
    type            = serializers.SerializerMethodField()
    uploaded_at     = serializers.SerializerMethodField()
    uploaded_by     = serializers.SerializerMethodField()
    album_id        = serializers.IntegerField(write_only=True, required=False)
    tag_ids         = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )
    member_ids      = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )

    class Meta:
        model = BaseMedia
        fields = [
            'url', 'album', 'tags', 'people', 'title', 'type',
            'uploaded_at', 'uploaded_by', 'album_id', 'tag_ids', 'member_ids'
        ]

    def get_url(self, obj):
        return get_presigned_url(obj.file)

    def get_album(self, obj):
        if not obj.base.album:
            return {
                'id': -1,
                'title': '미분류',
        }

        return AlbumSerializer(obj.base.album).data

    def get_tags(self, obj):
        tags = obj.base.tags.all()
        return TagSerializer(tags, many=True).data

    def get_people(self, obj):
        return MemberMiniSerializer(obj.base.people, many=True).data

    def get_title(self, obj):
        return obj.file.name.split('/')[-1]

    def get_type(self, obj):
        return obj.base.get_type_display()

    def get_uploaded_at(self, obj):
        return obj.base.uploaded_at.strftime('%Y-%m-%d')

    def get_uploaded_by(self, obj):
        return MemberMiniSerializer(obj.base.uploaded_by.member).data

    def create_base_media(self, validated_data, *args, **kwargs):
        album_id = validated_data.pop('album_id', None)
        tag_ids = validated_data.pop('tag_ids', [])
        member_ids = validated_data.pop('member_ids', [])

        media_type = kwargs.get('media_type', None)

        if album_id:
            try:
                album = Album.objects.get(id=album_id)
            except ObjectDoesNotExist:
                raise serializers.ValidationError('Invalid album id.')
            validated_data['album'] = album

        base_media = BaseMedia.objects.create(
            album=validated_data.get('album', None),
            uploaded_by=validated_data.get('uploaded_by'),
            type=media_type
        )

        if tag_ids:
            tags = Tag.objects.filter(id__in=tag_ids)
            base_media.tags.set(tags)
        if member_ids:
            members = Member.objects.filter(id__in=member_ids)
            base_media.people.set(members)

        base_media.save()

        return base_media

class ImageSerializer(BaseMediaDetailsSerializer):
    ## TODO: Implement exif data
    #exif_data       = serializers.SerializerMethodField()
    id              = serializers.IntegerField(read_only=True)
    base_id         = serializers.IntegerField(read_only=True, source='base.id')

    class Meta(BaseMediaDetailsSerializer.Meta):
        model = Image
        fields = BaseMediaDetailsSerializer.Meta.fields + ['id', 'base_id', 'file'] #, 'exif_data']

    def create(self, validated_data):
        with transaction.atomic():
            base_media = self.create_base_media(validated_data, media_type=MediaType.IMAGE)

            image = Image.objects.create(
                base=base_media,
                file=validated_data['file']
            )

            ## create thumbnail
            image.thumbnail = create_image_thumbnail(image.file)
            image.save()

            return image

class VideoSerializer(BaseMediaDetailsSerializer):
    id              = serializers.IntegerField(read_only=True)
    base_id         = serializers.IntegerField(read_only=True, source='base.id')
    duration        = serializers.IntegerField(read_only=True)
    thumbnail       = serializers.ImageField(read_only=True)

    class Meta(BaseMediaDetailsSerializer.Meta):
        model = Video
        fields = BaseMediaDetailsSerializer.Meta.fields + [
            'id', 'base_id', 'file', 'duration', 'thumbnail'
        ]

    def create(self, validated_data):
        with transaction.atomic():
            base_media = self.create_base_media(validated_data, media_type=MediaType.VIDEO)

            video = Video.objects.create(
                base=base_media,
                file=validated_data['file']
            )

            ## get thumbnail and duration
            thumbnail, duration = create_video_thumbnail_and_duration(validated_data['file'])
            video.thumbnail = thumbnail
            video.duration = duration
            video.save()

            return video

class AlbumSerializer(serializers.ModelSerializer):
    cover_images    = serializers.SerializerMethodField()
    num_images      = serializers.SerializerMethodField()
    num_videos      = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = [
            'id', 'title', 'cover_images',
            'num_images', 'num_videos', 'members_only'
        ]

    def get_cover_images(self, obj):
        ## random 3 images in the album.
        ## if there are less than 3 images, return all images.
        images = obj.media.filter(type=MediaType.IMAGE)

        if images.count() <= 3:
            return MediaSerializer(images, many=True).data

        return MediaSerializer(images.order_by('?')[:3], many=True).data

    def get_num_images(self, obj):
        return obj.media.filter(type=MediaType.IMAGE).count()

    def get_num_videos(self, obj):
        return obj.media.filter(type=MediaType.VIDEO).count()
