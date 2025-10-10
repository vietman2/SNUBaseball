from rest_framework import serializers


class PresignItemSerializer(serializers.Serializer):
    """
    단일 업로드 요청 아이템
    """

    filename = serializers.CharField(max_length=255)
    content_type = serializers.CharField(required=False, allow_blank=True)
    size = serializers.IntegerField(min_value=1)
