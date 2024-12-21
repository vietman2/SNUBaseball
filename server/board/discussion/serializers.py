from django.core.files.storage import default_storage
from django.db import transaction
from django.utils import timezone
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.storage import get_presigned_url
from person.user.serializers import AuthorSerializer
from .models import Discussion, DiscussionContentView, DiscussionAttachment, DiscussionComment

class DiscussionAttachmentSerializer(ModelSerializer):
    file = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = DiscussionAttachment
        fields = ['file', 'created_at', 'name']

    def get_file(self, obj):
        return get_presigned_url(obj.file)

    def get_name(self, obj):
        filename = obj.file.name.split('/')[-1]

        return filename[:50] + '...' if len(filename) > 50 else filename

class DiscussionCommentSerializer(ModelSerializer):
    id          = serializers.IntegerField(read_only=True)
    author      = AuthorSerializer(read_only=True)
    created_at  = serializers.DateTimeField(format="%m/%d", read_only=True)

    class Meta:
        model = DiscussionComment
        fields = ['id', 'content', 'author', 'created_at']

    def create(self, validated_data):
        user = self.context['request'].user
        discussion = self.context['discussion']

        return DiscussionComment.objects.create(
            author=user,
            discussion=discussion,
            **validated_data
        )

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.save()

        return instance

class DiscussionSimpleSerializer(ModelSerializer):
    author          = serializers.SerializerMethodField()
    created_at      = serializers.DateTimeField(format="%m/%d")
    num_comments    = serializers.SerializerMethodField()
    num_likes       = serializers.SerializerMethodField()
    has_attachment  = serializers.SerializerMethodField()

    class Meta:
        model = Discussion
        fields = [
            'id', 'title', 'author', 'created_at',
            'num_views', 'num_comments', 'num_likes', 'has_attachment']

    def get_author(self, obj):
        return obj.author.member.full_name

    def get_num_comments(self, obj):
        return obj.discussioncomment_set.count()
    
    def get_num_likes(self, obj):
        return obj.discussionlike_set.count()

    def get_has_attachment(self, obj):
        return obj.discussionattachment_set.exists()

class DiscussionDetailSerializer(ModelSerializer):
    author      = AuthorSerializer()
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")
    attachments = serializers.SerializerMethodField()
    comments    = serializers.SerializerMethodField()
    num_likes   = serializers.SerializerMethodField()
    is_liked    = serializers.SerializerMethodField()
    is_author   = serializers.SerializerMethodField()

    class Meta:
        model = Discussion
        fields = [
            'id', 'title', 'content', 'author', 'created_at', 'num_views',
            'attachments', 'comments', 'num_likes', 'is_liked', 'is_author'
        ]

    def increment_num_views(self):
        self.instance.num_views += 1
        self.instance.save()

        return self.instance

    def content_viewed(self, user):
        content_view, _ = DiscussionContentView.objects.get_or_create(
            user=user, discussion=self.instance
        )

        content_view.viewed_last_at = timezone.now()
        content_view.save()

        return content_view

    def get_attachments(self, obj):
        return DiscussionAttachmentSerializer(obj.discussionattachment_set.all(), many=True).data

    def get_comments(self, obj):
        all_comments = obj.discussioncomment_set.all()
        comments = all_comments.filter(is_deleted=False)
        serializer = DiscussionCommentSerializer(comments, many=True)

        return serializer.data

    def get_num_likes(self, obj):
        return obj.discussionlike_set.count()
    
    def get_is_liked(self, obj):
        user = self.context['request'].user

        return obj.discussionlike_set.filter(user=user).exists()

    def get_is_author(self, obj):
        user = self.context['request'].user

        return obj.author == user

class DiscussionWriteSerializer(ModelSerializer):
    class Meta:
        model = Discussion
        fields = ['title', 'content']

    def create(self, validated_data):
        user = self.context['request'].user

        with transaction.atomic():
            discussion = Discussion.objects.create(
                author=user,
                **validated_data
            )

            for attachment in self.context['request'].FILES.getlist('attachments'):
                path = f"discussions/{discussion.id}/{attachment.name}"
                uploaded_file = default_storage.save(path, attachment)

                DiscussionAttachment.objects.create(discussion=discussion, file=uploaded_file)

        return discussion

    def update(self, instance, validated_data):
        with transaction.atomic():
            instance.title = validated_data.get('title', instance.title)
            instance.content = validated_data.get('content', instance.content)
            instance.save()

            for attachment in self.context['request'].FILES.getlist('attachments'):
                path = f"discussions/{instance.id}/{attachment.name}"
                uploaded_file = default_storage.save(path, attachment)

                DiscussionAttachment.objects.create(discussion=instance, file=uploaded_file)

        return instance
