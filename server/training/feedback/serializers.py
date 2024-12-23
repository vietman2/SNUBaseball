from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from person.member.serializers import MemberSimpleSerializer
from person.user.serializers import AuthorSerializer
from .enums import StatusType
from .models import Feedback, FeedbackCategory, FeedbackContentView, FeedbackComment
from .utils import get_status_obj, get_status

class FeedbackCategorySerializer(ModelSerializer):
    class Meta:
        model = FeedbackCategory
        fields = ['label', 'color', 'background_color']

class FeedbackCommentSerializer(ModelSerializer):
    id      = serializers.IntegerField(read_only=True)
    author  = AuthorSerializer(read_only=True)
    created_at  = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = FeedbackComment
        fields = ['id', 'content', 'author', 'created_at']

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.save()

        return instance

    def create(self, validated_data):
        user = self.context['request'].user
        feedback = self.context['feedback']

        return FeedbackComment.objects.create(
            author=user,
            feedback=feedback,
            **validated_data
        )

class FeedbackSimpleSerializer(ModelSerializer):
    category    = FeedbackCategorySerializer()
    content     = serializers.SerializerMethodField()
    player      = serializers.SerializerMethodField()
    author      = serializers.SerializerMethodField()
    status      = serializers.SerializerMethodField()
    created_at  = serializers.DateTimeField(format="%m월 %d일")
    updated_at  = serializers.DateTimeField(format="%m월 %d일")
    num_comments= serializers.SerializerMethodField()

    class Meta:
        model = Feedback
        fields = [
            'id', 'title', 'content', 'player', 'author', 'category',
            'status', 'created_at', 'updated_at', 'num_comments'
        ]

    def get_content(self, obj):
        return obj.content[:50]

    def get_player(self, obj):
        return obj.player.full_name

    def get_author(self, obj):
        return obj.author.member.full_name

    def get_status(self, obj):
        return get_status_obj(obj)

    def get_num_comments(self, obj):
        return obj.comments.filter(is_deleted=False).count()

class FeedbackDetailSerializer(ModelSerializer):
    category    = FeedbackCategorySerializer()
    player      = MemberSimpleSerializer()
    author      = AuthorSerializer()
    comments    = serializers.SerializerMethodField()
    status      = serializers.SerializerMethodField()
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")
    updated_at  = serializers.DateTimeField(format="%Y-%m-%d")
    num_comments= serializers.SerializerMethodField()

    class Meta:
        model = Feedback
        fields = [
            'id', 'title', 'content', 'player', 'author', 'category', 'status',
            'created_at', 'updated_at', 'num_views', 'comments', 'num_comments'
        ]

    def increment_num_views(self):
        self.instance.num_views += 1
        self.instance.save()

        return self.instance
    
    def content_viewed(self, user):
        content_view, _ = FeedbackContentView.objects.get_or_create(
            user=user,
            feedback=self.instance
        )

        content_view.viewed_last_at = content_view.viewed_last_at.now()
        content_view.save()

        return content_view

    def get_status(self, obj):
        return get_status_obj(obj)

    def get_comments(self, obj):
        return FeedbackCommentSerializer(obj.comments.filter(is_deleted=False), many=True).data

    def get_num_comments(self, obj):
        return obj.comments.filter(is_deleted=False).count()

class FeedbackWriteSerializer(ModelSerializer):
    category    = serializers.CharField()
    status      = serializers.CharField()

    class Meta:
        model = Feedback
        fields = ['title', 'content', 'category', 'player', 'status']

    def validate_category(self, value):
        category = FeedbackCategory.objects.filter(label=value).first()

        if not category:
            raise serializers.ValidationError('Invalid category')

        return category

    def validate_status(self, value):
        return get_status(value)

    def create(self, validated_data):
        user = self.context['request'].user

        return Feedback.objects.create(
            author=user,
            category_id=validated_data['category'].id,
            **validated_data
        )
