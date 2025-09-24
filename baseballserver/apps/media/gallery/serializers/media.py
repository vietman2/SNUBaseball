from rest_framework import serializers

from ..models import GalleryImage, GalleryVideo


class GalleryImageSerializer(serializers.ModelSerializer):
    uploaded_by = serializers.CharField(
        source="uploaded_by.member.name", read_only=True
    )

    class Meta:
        model = GalleryImage
        fields = ["id", "type", "url", "created_at", "uploaded_by"]


class GalleryVideoSerializer(serializers.ModelSerializer):
    uploaded_by = serializers.CharField(
        source="uploaded_by.member.name", read_only=True
    )

    class Meta:
        model = GalleryVideo
        fields = ["id", "type", "url", "created_at", "uploaded_by"]
