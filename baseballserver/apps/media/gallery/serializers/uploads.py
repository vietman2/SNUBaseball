from rest_framework import serializers

from apps.media.assets.api import UploadCompleteSerializer
from ..models import MediaTag


class GalleryUploadCompleteSerializer(serializers.Serializer):
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=MediaTag.objects.all(),
        many=True,
        required=False,
    )
    items = UploadCompleteSerializer(many=True)
