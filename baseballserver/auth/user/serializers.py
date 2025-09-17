from rest_framework import serializers

from member.person.serializers import ProfileSerializer
from .models import User


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    member = ProfileSerializer()

    class Meta:
        model = User
        fields = ["uuid", "username", "role", "member"]

    def get_username(self, obj):
        ## 마스킹 처리
        return obj.username[:3] + "****"

    def get_role(self, obj):
        if obj.is_superuser:
            return "ADMIN"
        elif obj.member and obj.member.role.id in [1, 2, 3]:
            return "LEADER"
        elif obj.member and obj.member.role.id in [6, 7, 8]:
            return "STAFF"
        else:
            return "MEMBER"
