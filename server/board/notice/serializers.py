from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from person.user.serializers import AuthorSerializer
from .models import Notice, NoticeCategory, NoticeComment, NoticeContentView

class NoticeCategorySerializer(ModelSerializer):
    class Meta:
        model = NoticeCategory
        fields = ['label', 'color', 'background_color']

class NoticeCommentSerializer(ModelSerializer):
    author = AuthorSerializer()

    class Meta:
        model = NoticeComment
        fields = ['content', 'author', 'created_at']

class NoticeSimpleSerializer(ModelSerializer):
    category    = NoticeCategorySerializer()
    author      = serializers.SerializerMethodField()
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Notice
        fields = ['id', 'title', 'category', 'author', 'created_at', 'num_views']

    def get_author(self, obj):
        return obj.author.member.full_name

class NoticeDetailSerializer(ModelSerializer):
    category    = NoticeCategorySerializer()
    author      = AuthorSerializer()
    comments    = serializers.SerializerMethodField()
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Notice
        fields = [
            'id', 'title', 'content', 'category', 'author',
            'created_at', 'num_views', 'comments'
        ]

    def increment_num_views(self):
        self.instance.num_views += 1
        self.instance.save()

        return self.instance

    def content_viewed(self, user):
        content_view, _ = NoticeContentView.objects.get_or_create(
            user=user,
            notice=self.instance
        )

        content_view.viewed_last_at = content_view.viewed_last_at.now()
        content_view.save()

        return content_view

    def get_comments(self, obj):
        comments = obj.noticecomment_set.all()
        serializer = NoticeCommentSerializer(comments, many=True)

        return serializer.data
