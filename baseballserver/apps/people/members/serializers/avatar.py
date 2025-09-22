from rest_framework import serializers


class AvatarPresignSerializer(serializers.Serializer):
    filename = serializers.CharField(max_length=255)
    content_type = serializers.CharField(required=False, allow_blank=True)
    size = serializers.IntegerField(min_value=1)


class AvatarCompleteSerializer(serializers.Serializer):
    key = serializers.CharField()
    original_filename = serializers.CharField(max_length=255, required=False)
