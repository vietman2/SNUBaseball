from rest_framework import serializers


class UploadCompleteSerializer(serializers.Serializer):
    key = serializers.CharField()
    original_filename = serializers.CharField(
        max_length=255, required=False, allow_blank=True
    )
