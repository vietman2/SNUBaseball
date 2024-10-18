from django.core.files.storage import default_storage
from django.db import transaction
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.storage import get_presigned_url
from person.user.serializers import AuthorSerializer
from .models import Information, InformationContentView, InformationAttachment

class InformationAttachmentSerializer(ModelSerializer):
    file = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = InformationAttachment
        fields = ['file', 'created_at', 'name']

    def get_file(self, obj):
        return get_presigned_url(obj.file)

    def get_name(self, obj):
        filename = obj.file.name.split('/')[-1]

        return filename[:50] + '...' if len(filename) > 50 else filename

class InformationSimpleSerializer(ModelSerializer):
    author      = serializers.SerializerMethodField()
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")
    has_attachment  = serializers.SerializerMethodField()

    class Meta:
        model = Information
        fields = ['id', 'title', 'author', 'created_at', 'num_views', 'pin', 'has_attachment']

    def get_author(self, obj):
        return obj.author.member.full_name

    def get_has_attachment(self, obj):
        return obj.informationattachment_set.exists()

class InformationDetailSerializer(ModelSerializer):
    author      = AuthorSerializer()
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")
    attachments = serializers.SerializerMethodField()

    class Meta:
        model = Information
        fields = [
            'id', 'title', 'content', 'author',
            'created_at', 'num_views', 'pin', 'attachments'
        ]

    def increment_num_views(self):
        self.instance.num_views += 1
        self.instance.save()

        return self.instance

    def content_viewed(self, user):
        content_view, _ = InformationContentView.objects.get_or_create(
            user=user,
            information=self.instance
        )

        content_view.viewed_last_at = content_view.viewed_last_at.now()
        content_view.save()

        return content_view

    def get_attachments(self, obj):
        attachments = obj.informationattachment_set.all()
        serializer = InformationAttachmentSerializer(attachments, many=True)

        return serializer.data

class InformationWriteSerializer(ModelSerializer):
    class Meta:
        model = Information
        fields = ['title', 'content', 'pin']

    def create(self, validated_data):
        with transaction.atomic():
            user = self.context['request'].user
            validated_data['author'] = user
            information = Information.objects.create(**validated_data)

            for attachment in self.context['request'].FILES.getlist('attachments'):
                path = f"information/{information.id}/{attachment.name}"
                uploaded_file = default_storage.save(path, attachment)

                InformationAttachment.objects.create(
                    information=information,
                    file=uploaded_file
                )

            return information

    def update(self, instance, validated_data):
        with transaction.atomic():
            instance.title = validated_data.get('title', instance.title)
            instance.content = validated_data.get('content', instance.content)
            instance.pin = validated_data.get('pin', instance.pin)
            instance.save()

            for attachment in self.context['request'].FILES.getlist('attachments'):
                path = f"information/{instance.id}/{attachment.name}"
                uploaded_file = default_storage.save(path, attachment)

                InformationAttachment.objects.create(
                    information=instance,
                    file=uploaded_file
                )

            return instance
