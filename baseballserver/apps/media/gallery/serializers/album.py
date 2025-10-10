from rest_framework import serializers

from ..models import Album


class AlbumSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()
    num_images = serializers.IntegerField(read_only=True, source="images.count")
    num_videos = serializers.IntegerField(read_only=True, source="videos.count")

    class Meta:
        model = Album
        fields = [
            "id",
            "title",
            "members_only",
            "color",
            "cover_image_url",
            "num_images",
            "num_videos",
        ]

    def get_cover_image_url(self, obj):
        ## random image from the album.
        images = obj.images.all()
        if images.exists():
            image = images.order_by("?").first()
            return image.image.url
        return None


class AlbumSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ["id", "title", "members_only", "color"]
        read_only_fields = ["id"]
