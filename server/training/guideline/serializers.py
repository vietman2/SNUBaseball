from django.core.files.storage import default_storage
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.storage import get_presigned_url
from person.user.serializers import AuthorSerializer
from .models import (
    Guideline, GuidelineComment, GuidelineContentView, GuidelineCategory, GuidelineLike
)
from .utils import get_type_chip, get_location_chip, parse_media_url

class GuidelineSimpleSerializer(ModelSerializer):
    author          = serializers.CharField(source='author.member.full_name')
    created_at      = serializers.DateTimeField(format="%Y-%m-%d")
    preview_image   = serializers.SerializerMethodField()
    num_likes       = serializers.SerializerMethodField()
    num_comments    = serializers.SerializerMethodField()
    num_people      = serializers.SerializerMethodField()
    type            = serializers.SerializerMethodField()
    location        = serializers.SerializerMethodField()

    class Meta:
        model = Guideline
        fields = [
            'id', 'title', 'author', 'created_at', 'preview_image', "is_youtube",
            'num_likes', 'num_comments', 'type', 'location', 'num_people'
        ]

    def get_preview_image(self, obj):
        if obj.is_youtube:
            return f"https://img.youtube.com/vi/{obj.video_id}/0.jpg"

        return get_presigned_url(obj.thumbnail)

    def get_num_likes(self, obj):
        return obj.likes.count()

    def get_num_comments(self, obj):
        comments = obj.comments.filter(is_deleted=False)
        return comments.count()

    def get_num_people(self, obj):
        return f"{obj.min_people} ~ {obj.max_people}명"

    def get_type(self, obj):
        return get_type_chip(obj.is_drill)

    def get_location(self, obj):
        return get_location_chip(obj.is_indoor)

class GuidelineCommentSerializer(ModelSerializer):
    id          = serializers.IntegerField(read_only=True)
    author      = AuthorSerializer(read_only=True)
    created_at  = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = GuidelineComment
        fields = ['id', 'content', 'author', 'created_at']

    def create(self, validated_data):
        user = self.context['request'].user
        guideline = self.context['guideline']

        return GuidelineComment.objects.create(
            author=user,
            guideline=guideline,
            **validated_data
        )

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.save()

        return instance

class GuidelineDetailSerializer(ModelSerializer):
    author          = AuthorSerializer()
    category        = serializers.CharField(source='category.name')
    created_at      = serializers.DateTimeField(format="%Y-%m-%d")
    comments        = serializers.SerializerMethodField()
    type            = serializers.SerializerMethodField()
    location        = serializers.SerializerMethodField()
    is_liked        = serializers.SerializerMethodField()
    num_likes       = serializers.SerializerMethodField()
    thumbnail       = serializers.SerializerMethodField()

    class Meta:
        model = Guideline
        fields = [
            "id", "title", "author", "content", "category", "created_at",
            "video_id", "comments", "type", "location", "min_people",
            "max_people", "is_drill", "is_indoor", "is_liked", "num_likes",
            "is_youtube", "video_url", "thumbnail"
        ]

    def increment_num_views(self):
        self.instance.num_views += 1
        self.instance.save()

        return self.instance

    def content_viewed(self, user):
        content_view, _ = GuidelineContentView.objects.get_or_create(
            user=user,
            guideline=self.instance
        )

        content_view.viewed_last_at = content_view.viewed_last_at.now()
        content_view.save()

        return content_view

    def get_comments(self, obj):
        all_comments = obj.comments.all()
        comments = all_comments.filter(is_deleted=False)

        return GuidelineCommentSerializer(comments, many=True).data

    def get_type(self, obj):
        return get_type_chip(obj.is_drill)

    def get_location(self, obj):
        return get_location_chip(obj.is_indoor)

    def get_is_liked(self, obj):
        request = self.context.get('request')
        user = request.user

        return GuidelineLike.objects.filter(guideline=obj, user=user).exists()

    def get_num_likes(self, obj):
        return obj.likes.count()

    def get_thumbnail(self, obj):
        return get_presigned_url(obj.thumbnail) if obj.thumbnail else None

class GuidelineWriteSerializer(ModelSerializer):
    category    = serializers.CharField()
    video_id    = serializers.CharField(read_only=True)
    url         = serializers.CharField(write_only=True)

    class Meta:
        model = Guideline
        fields = [
            "title", "content", "video_id", "is_drill", "category",
            "is_indoor", "min_people", "max_people", "url"
        ]

    def validate_category(self, value):
        try:
            category = GuidelineCategory.objects.get(name=value)
        except GuidelineCategory.DoesNotExist:
            raise serializers.ValidationError("존재하지 않는 카테고리입니다.")

        return category

    def validate(self, attrs):
        ## check min_people and max_people
        min_people = attrs.get("min_people")
        max_people = attrs.get("max_people")

        if min_people > max_people:
            raise serializers.ValidationError("최소 인원이 최대 인원보다 큽니다.")

        return attrs

    def create(self, validated_data):
        url = validated_data.pop("url")
        parsed_media_url = parse_media_url(url)

        video_id = parsed_media_url.get("video_id")
        validated_data["is_youtube"] = parsed_media_url.get("is_youtube")
        validated_data["video_url"] = parsed_media_url.get("video_url", None)
        thumbnail_file = parsed_media_url.get("thumbnail", None)

        path = f"guideline/thumbnails/{video_id}.jpg"
        uploaded_file = default_storage.save(path, thumbnail_file)
        validated_data["video_id"] = video_id
        validated_data["thumbnail"] = uploaded_file

        request = self.context.get("request")
        author = request.user

        validated_data["author"] = author
        return super().create(validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.content = validated_data.get("content", instance.content)
        instance.video_id = validated_data.get("video_id", instance.video_id)
        instance.is_drill = validated_data.get("is_drill", instance.is_drill)
        instance.category = validated_data.get("category", instance.category)
        instance.is_indoor = validated_data.get("is_indoor", instance.is_indoor)
        instance.min_people = validated_data.get("min_people", instance.min_people)
        instance.max_people = validated_data.get("max_people", instance.max_people)

        instance.save()

        return instance
