from datetime import datetime
from django.core.files.storage import default_storage
from rest_framework import serializers

from .models import Memory

class MemoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = ['id', 'title', 'description', 'file']

class ImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memory
        fields = ['title', 'description', 'file']

    def upload(self, validated_data):
        year = datetime.now().strftime('%Y')
        month = datetime.now().strftime('%m')
        day = datetime.now().strftime('%d')

        file = validated_data.pop('file')
        path = f"archive/{year}/{month}/{day}/{file.name}"
        default_storage.save(path, file)
        return path

    def create(self, validated_data):
        path = self.upload(validated_data)
        return Memory.objects.create(file=path, **validated_data)
