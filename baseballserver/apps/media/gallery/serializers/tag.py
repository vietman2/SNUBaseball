from rest_framework import serializers

from ..models import MediaTag


class MediaTagSerializer(serializers.ModelSerializer):
    num_images = serializers.SerializerMethodField()
    num_videos = serializers.SerializerMethodField()

    class Meta:
        model = MediaTag
        fields = ["id", "name", "color", "icon", "num_images", "num_videos"]
        read_only_fields = ["id"]

    def get_num_images(self, obj):
        return obj.images.count()

    def get_num_videos(self, obj):
        return obj.videos.count()
