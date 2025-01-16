from django.core.files.storage import default_storage
from django.db import transaction
from django.utils import timezone
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.storage import get_presigned_url
from person.user.serializers import AuthorSerializer
from .models import Minutes, MinutesAttachment

class MinutesAttachmentSerializer(ModelSerializer):
    file = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = MinutesAttachment
        fields = ['file', 'created_at', 'name']

    def get_file(self, obj):
        return get_presigned_url(obj.file)

    def get_name(self, obj):
        filename = obj.file.name.split('/')[-1]

        return filename

class MinutesSerializer(ModelSerializer):
    author      = AuthorSerializer(read_only=True)
    attachments = serializers.SerializerMethodField()
    created_at  = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Minutes
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at', 'attachments']

    def get_attachments(self, obj):
        attachments = obj.minutesattachment_set.all()
        serializer = MinutesAttachmentSerializer(attachments, many=True)

        return serializer.data

    def create(self, validated_data):
        with transaction.atomic():
            user = self.context['request'].user
            attachments = self.context['request'].FILES.getlist('attachments')
            minutes = Minutes.objects.create(
                author=user,
                **validated_data
            )

            for attachment in attachments:
                path = f"minutes/{minutes.id}/{attachment.name}"
                uploaded_file = default_storage.save(path, attachment)

                MinutesAttachment.objects.create(
                    minutes=minutes,
                    file=uploaded_file
                )

            return minutes
