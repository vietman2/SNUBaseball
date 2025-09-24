from rest_framework import serializers

from ..models import MediaTag


class MediaTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaTag
        fields = ["id", "name"]
        read_only_fields = ["id"]
