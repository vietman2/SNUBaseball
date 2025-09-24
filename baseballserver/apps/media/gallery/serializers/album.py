from rest_framework import serializers

from .media import GalleryImageSerializer
from ..models import Album


class AlbumSerializer(serializers.ModelSerializer):
    cover_images = serializers.SerializerMethodField()
    num_images = serializers.IntegerField(read_only=True, source="images.count")
    num_videos = serializers.IntegerField(read_only=True, source="videos.count")

    class Meta:
        model = Album
        fields = [
            "id",
            "title",
            "members_only",
            "cover_images",
            "num_images",
            "num_videos",
        ]

    def get_cover_images(self, obj):
        ## random 3 images in the album.
        ## if there are less than 3 images, return all images.

        if obj.images.count() <= 3:
            return GalleryImageSerializer(obj.images.all(), many=True).data

        return GalleryImageSerializer(obj.images.order_by("?")[:3], many=True).data
