from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from ..models import User


class ProfileSerializer(ModelSerializer):
    name = serializers.CharField(source="member.full_name", read_only=True)
    profile_image = serializers.ImageField(
        source="member.profile_image", read_only=True
    )

    class Meta:
        model = User
        fields = ["uuid", "name", "profile_image"]
