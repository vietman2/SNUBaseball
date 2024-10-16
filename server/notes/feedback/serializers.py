from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from person.user.serializers import AuthorSerializer
from .models import Feedback, FeedbackCategory, FeedbackContentView, FeedbackComment

class FeedbackCategorySerializer(ModelSerializer):
    class Meta:
        model = FeedbackCategory
        fields = ['label', 'color', 'background_color']

class FeedbackCommentSerializer(ModelSerializer):
    author = AuthorSerializer()

    class Meta:
        model = FeedbackComment
        fields = ['content', 'author', 'created_at']

class FeedbackSimpleSerializer(ModelSerializer):
    category    = FeedbackCategorySerializer()
    content     = serializers.SerializerMethodField()
    player      = serializers.SerializerMethodField()
    author      = serializers.SerializerMethodField()
    status      = serializers.CharField(source='get_status_display')
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")
    updated_at  = serializers.DateTimeField(format="%Y-%m-%d")
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
        return obj.player.member.full_name

    def get_author(self, obj):
        return obj.author.member.full_name

    def get_num_comments(self, obj):
        return obj.comments.count()

class FeedbackDetailSerializer(ModelSerializer):
    category    = FeedbackCategorySerializer()
    player      = AuthorSerializer()
    author      = AuthorSerializer()
    comments    = serializers.SerializerMethodField()
    status      = serializers.CharField(source='get_status_display')
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

    def get_comments(self, obj):
        return FeedbackCommentSerializer(obj.comments.all(), many=True).data

    def get_num_comments(self, obj):
        return obj.comments.count()
