from rest_framework import serializers

from ..models import GalleryImage, GalleryVideo


class GalleryImageSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source="image.url", read_only=True)
    created_at = serializers.DateTimeField(
        source="image.file.created_at", read_only=True, format="%Y-%m-%d %H:%M"
    )
    uploaded_by = serializers.CharField(
        source="image.uploaded_by.member.name", read_only=True
    )

    class Meta:
        model = GalleryImage
        fields = ["id", "type", "url", "created_at", "uploaded_by"]


class GalleryVideoSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source="video.url", read_only=True)
    created_at = serializers.DateTimeField(
        source="video.file.created_at", read_only=True, format="%Y-%m-%d %H:%M"
    )
    uploaded_by = serializers.CharField(
        source="video.uploaded_by.member.name", read_only=True
    )

    class Meta:
        model = GalleryVideo
        fields = ["id", "type", "url", "created_at", "uploaded_by"]
