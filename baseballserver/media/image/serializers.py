from rest_framework import serializers

from .models import SNUBaseballImage
from .utils import get_image_url


class ThumbnailSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = SNUBaseballImage
        fields = ["url"]
        read_only_fields = ["url"]

    def get_url(self, obj):
        return get_image_url(obj.key)
