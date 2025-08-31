from rest_framework import serializers

from .models import User


class UserProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="member.name")
    profile_image = serializers.ImageField(source="member.profile_image")

    class Meta:
        model = User
        fields = ["uuid", "username", "name", "profile_image"]
