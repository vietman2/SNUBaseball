from rest_framework import serializers

from apps.people.members.api import MemberDetailsSerializer
from ..models import User


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    member = MemberDetailsSerializer()

    class Meta:
        model = User
        fields = ["uuid", "username", "role", "member"]

    def get_username(self, obj):
        ## 마스킹 처리
        return obj.username[:3] + "****"

    def get_role(self, obj):
        if obj.is_superuser:
            return "ADMIN"
        if obj.member and obj.member.role.is_leadership:
            return "LEADER"
        if obj.member and obj.member.role.is_staff:
            return "STAFF"

        return "MEMBER"
