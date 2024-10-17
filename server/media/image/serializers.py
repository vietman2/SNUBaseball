from django.core.files.storage import default_storage
from django.utils import timezone
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Image

class ImageUploadSerializer(ModelSerializer):
    path = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Image
        fields = ['image', 'path']

    def validate(self, attrs):
        attrs['path'] = self.validate_path(attrs.get('path', ''))
        return attrs

    def validate_path(self, value):
        if not value:
            user = self.context['request'].user
            student_id = user.member.student_id
            value = f"images/{student_id}/{timezone.now().strftime('%Y%m%d%H%M%S')}"

        return value

    def create(self, validated_data):
        file = validated_data['image']
        path = validated_data['path']
        extension = file.name.split('.')[-1]
        path = f"{path}.{extension}"
        uploaded_file = default_storage.save(path, file)
        title = path.split('/')[-1]
        image = Image.objects.create(title=title, image=uploaded_file)

        return image
