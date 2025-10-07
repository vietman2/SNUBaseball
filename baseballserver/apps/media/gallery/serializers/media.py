from rest_framework import serializers

from apps.people.users.serializers import UserRelatedSerializer
from .album import AlbumSimpleSerializer
from .tag import MediaTagSerializer
from ..models import GalleryImage, GalleryVideo, Album, MediaTag


class GalleryImageSerializer(serializers.ModelSerializer):
    key = serializers.CharField(source="image.file.key", read_only=True)
    url = serializers.CharField(source="image.url", read_only=True)
    filename = serializers.CharField(
        source="image.file.original_filename", read_only=True
    )
    album = AlbumSimpleSerializer(read_only=True)
    tags = MediaTagSerializer(many=True, read_only=True)
    created_at = serializers.DateTimeField(
        source="image.file.created_at", read_only=True, format="%Y-%m-%d"
    )
    uploaded_by = serializers.SerializerMethodField()

    ## 수정할 수 있는 필드는: album, tags 밖에 없다
    album_id = serializers.PrimaryKeyRelatedField(
        source="album",
        queryset=Album.objects.all(),
        write_only=True,
        required=False,
    )
    tag_ids = serializers.PrimaryKeyRelatedField(
        source="tags",
        queryset=MediaTag.objects.all(),
        many=True,
        write_only=True,
        required=False,
    )

    class Meta:
        model = GalleryImage
        fields = [
            "id",
            "key",
            "type",
            "filename",
            "url",
            "album",
            "tags",
            "created_at",
            "uploaded_by",
            "album_id",
            "tag_ids",
        ]

    def get_uploaded_by(self, obj):
        if obj.image.uploaded_by:
            return UserRelatedSerializer(obj.image.uploaded_by).data
        return None


class GalleryVideoSerializer(serializers.ModelSerializer):
    key = serializers.CharField(source="video.file.key", read_only=True)
    url = serializers.CharField(source="video.url", read_only=True)
    filename = serializers.CharField(
        source="video.file.original_filename", read_only=True
    )
    album = AlbumSimpleSerializer(read_only=True)
    tags = MediaTagSerializer(many=True, read_only=True)
    created_at = serializers.DateTimeField(
        source="video.file.created_at", read_only=True, format="%Y-%m-%d"
    )
    uploaded_by = serializers.SerializerMethodField()

    album_id = serializers.PrimaryKeyRelatedField(
        source="album",
        queryset=Album.objects.all(),
        write_only=True,
        required=False,
    )
    tag_ids = serializers.PrimaryKeyRelatedField(
        source="tags",
        queryset=MediaTag.objects.all(),
        many=True,
        write_only=True,
        required=False,
    )

    class Meta:
        model = GalleryVideo
        fields = [
            "id",
            "key",
            "type",
            "filename",
            "url",
            "album",
            "tags",
            "created_at",
            "uploaded_by",
            "thumbnail_url",
            "album_id",
            "tag_ids",
        ]

    def get_uploaded_by(self, obj):
        if obj.video.uploaded_by:
            return UserRelatedSerializer(obj.video.uploaded_by).data
        return None
