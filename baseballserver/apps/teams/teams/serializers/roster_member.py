from rest_framework import serializers

from apps.people.members.api import MemberPublicSerializer
from ..models import RosterMember


class RosterMemberSerializer(serializers.ModelSerializer):
    member = MemberPublicSerializer()
    role = serializers.SerializerMethodField()

    class Meta:
        model = RosterMember
        fields = [
            "id",
            "role",
            "member",
            "back_number",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def get_role(self, obj):
        if obj.is_captain:
            return "주장"
        if obj.is_vice_captain:
            return "부주장"
        if obj.is_head_manager:
            return "수석매니저"
        return obj.get_role_display()


class RosterMemberDetailsSerializer(serializers.ModelSerializer):
    member = MemberPublicSerializer()
    role = serializers.SerializerMethodField()
    hands = serializers.CharField(source="get_hands_display")

    class Meta:
        model = RosterMember
        fields = [
            "id",
            "member",
            "role",
            "position",
            "hands",
            "back_number",
            "height",
            "weight",
            "goal",
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def get_role(self, obj):
        if obj.is_captain:
            return "주장"
        if obj.is_vice_captain:
            return "부주장"
        if obj.is_head_manager:
            return "수석매니저"
        if obj.is_head_coach:
            return "감독"
        return obj.get_role_display()
