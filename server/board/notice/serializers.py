from django.core.files.storage import default_storage
from django.db import transaction
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.storage import get_presigned_url
from person.user.serializers import AuthorSerializer
from .models import Notice, NoticeCategory, NoticeComment, NoticeContentView, NoticeAttachment

class NoticeCategorySerializer(ModelSerializer):
    class Meta:
        model = NoticeCategory
        fields = ['label', 'color', 'background_color']

class NoticeAttachmentSerializer(ModelSerializer):
    file = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = NoticeAttachment
        fields = ['file', 'created_at', 'name']

    def get_file(self, obj):
        return get_presigned_url(obj.file)

    def get_name(self, obj):
        filename = obj.file.name.split('/')[-1]

        return filename[:50] + '...' if len(filename) > 50 else filename

class NoticeCommentSerializer(ModelSerializer):
    author = AuthorSerializer()

    class Meta:
        model = NoticeComment
        fields = ['content', 'author', 'created_at']

class NoticeSimpleSerializer(ModelSerializer):
    category        = NoticeCategorySerializer()
    author          = serializers.SerializerMethodField()
    created_at      = serializers.DateTimeField(format="%Y-%m-%d")
    has_attachment  = serializers.SerializerMethodField()

    class Meta:
        model = Notice
        fields = [
            'id', 'title', 'category', 'author',
            'created_at', 'num_views', 'has_attachment'
        ]

    def get_author(self, obj):
        return obj.author.member.full_name

    def get_has_attachment(self, obj):
        return obj.noticeattachment_set.exists()

class NoticeDetailSerializer(ModelSerializer):
    category    = NoticeCategorySerializer()
    author      = AuthorSerializer()
    comments    = serializers.SerializerMethodField()
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")
    attachments = serializers.SerializerMethodField()

    class Meta:
        model = Notice
        fields = [
            'id', 'title', 'content', 'category', 'author',
            'created_at', 'num_views', 'comments', 'attachments'
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
    
    def get_attachments(self, obj):
        attachments = obj.noticeattachment_set.all()
        serializer = NoticeAttachmentSerializer(attachments, many=True)

        return serializer.data

class NoticeWriteSerializer(ModelSerializer):
    category_label = serializers.CharField(write_only=True)

    class Meta:
        model = Notice
        fields = ['title', 'content', 'category_label']

    def validate_category_label(self, value):
        try:
            category = NoticeCategory.objects.get(label=value)
        except NoticeCategory.DoesNotExist:
            raise serializers.ValidationError("해당 카테고리가 존재하지 않습니다.")

        return category

    def create(self, validated_data):
        with transaction.atomic():
            user = self.context['request'].user
            validated_data['author'] = user
            validated_data['category'] = validated_data.pop('category_label')
            notice = Notice.objects.create(**validated_data)

            for attachment in self.context['request'].FILES.getlist('attachments'):
                path = f"notices/{notice.id}/{attachment.name}"
                uploaded_file = default_storage.save(path, attachment)

                NoticeAttachment.objects.create(notice=notice, file=uploaded_file)

            return notice

    def update(self, instance, validated_data):
        with transaction.atomic():
            instance.title = validated_data.get('title', instance.title)
            instance.content = validated_data.get('content', instance.content)
            instance.category = validated_data.get('category_label', instance.category)

            instance.save()

            for attachment in self.context['request'].FILES.getlist('attachments'):
                path = f"notices/{instance.id}/{attachment.name}"
                uploaded_file = default_storage.save(path, attachment)

                NoticeAttachment.objects.create(notice=instance, file=uploaded_file)

            return instance
