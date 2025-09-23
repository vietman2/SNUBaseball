from rest_framework import serializers

from ..models import TeamRoster, TeamRoleChoices
from .roster_member import RosterMemberSerializer


class RosterSerializer(serializers.ModelSerializer):
    code = serializers.CharField(source="team_code")
    managers = serializers.SerializerMethodField()
    players = serializers.SerializerMethodField()

    class Meta:
        model = TeamRoster
        fields = [
            "code",
            "managers",
            "players",
        ]

    def get_managers(self, obj):
        ## 수석매니저가 가장 먼저 오도록
        ## 그 다음은 등번호 오름차순
        managers = obj.roster_members.filter(role=TeamRoleChoices.MANAGER).order_by(
            "-is_head_manager", "back_number"
        )

        return RosterMemberSerializer(managers, many=True).data

    def get_players(self, obj):
        ## 주장, 부주장이 먼저,
        ## 그 다음은 등번호 오름차순
        players = obj.roster_members.filter(role=TeamRoleChoices.PLAYER).order_by(
            "-is_captain", "-is_vice_captain", "back_number"
        )

        return RosterMemberSerializer(players, many=True).data
