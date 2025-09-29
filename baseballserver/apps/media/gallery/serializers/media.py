from rest_framework import serializers

from ..models import GalleryImage, GalleryVideo


class GalleryImageSerializer(serializers.ModelSerializer):
    key = serializers.CharField(source="image.file.key", read_only=True)
    url = serializers.CharField(source="image.url", read_only=True)
    filename = serializers.CharField(
        source="image.file.original_filename", read_only=True
    )
    album = serializers.CharField(source="album.name", read_only=True)
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")
    created_at = serializers.DateTimeField(
        source="image.file.created_at", read_only=True, format="%Y-%m-%d"
    )
    uploaded_by = serializers.CharField(
        source="image.uploaded_by.member.name", read_only=True
    )

    class Meta:
        model = GalleryImage
        fields = [
            "key",
            "type",
            "filename",
            "url",
            "album",
            "tags",
            "created_at",
            "uploaded_by",
        ]


class GalleryVideoSerializer(serializers.ModelSerializer):
    key = serializers.CharField(source="video.file.key", read_only=True)
    url = serializers.CharField(source="video.url", read_only=True)
    filename = serializers.CharField(
        source="video.file.original_filename", read_only=True
    )
    album = serializers.CharField(source="album.name", read_only=True)
    tags = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")
    created_at = serializers.DateTimeField(
        source="video.file.created_at", read_only=True, format="%Y-%m-%d"
    )
    uploaded_by = serializers.CharField(
        source="video.uploaded_by.member.name", read_only=True
    )

    class Meta:
        model = GalleryVideo
        fields = [
            "key",
            "type",
            "filename",
            "url",
            "album",
            "tags",
            "created_at",
            "uploaded_by",
            "thumbnail_url",
        ]
