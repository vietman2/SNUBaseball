from rest_framework import serializers

from .media import GalleryImageSerializer
from ..models import Album


class AlbumSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    num_images = serializers.IntegerField(read_only=True, source="images.count")
    num_videos = serializers.IntegerField(read_only=True, source="videos.count")

    class Meta:
        model = Album
        fields = [
            "id",
            "title",
            "members_only",
            "cover_image",
            "num_images",
            "num_videos",
        ]

    def get_cover_image(self, obj):
        ## random image from the album.
        images = obj.images.all()
        if images.exists():
            image = images.order_by("?").first()
            return GalleryImageSerializer(image).data
        return None
