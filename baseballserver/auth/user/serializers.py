from rest_framework import serializers

from member.person.serializers import ProfileSerializer
from .models import User


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    member = ProfileSerializer()

    class Meta:
        model = User
        fields = ["uuid", "username", "member"]

    def get_username(self, obj):
        ## 마스킹 처리
        return obj.username[:3] + "****"
