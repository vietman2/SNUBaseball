import factory
from factory.django import DjangoModelFactory

from apps.teams.teams.models import TeamRoster, RosterMember, TeamRoleChoices
from .members import MemberFactory


class TeamRosterFactory(DjangoModelFactory):
    class Meta:
        model = TeamRoster
        skip_postgeneration_save = True

    year = factory.Sequence(lambda n: 2025 + n)
    semester = "1"

    @classmethod
    def create_team_roster(cls, year: int, semester: str) -> TeamRoster:
        """
        특정 학기의 팀 로스터 생성
        """
        roster = cls.create(year=year, semester=semester)

        ## 기본 부원 10명 추가 (주장, 부주장, 수석매니저, 감독 각 1명, 매니저 2명, 선수 4명)
        captain = MemberFactory.create_captain()
        RosterMember.objects.create(
            team=roster, member=captain, role=TeamRoleChoices.PLAYER, is_captain=True
        )
        vice_captain = MemberFactory.create_vice_captain()
        RosterMember.objects.create(
            team=roster,
            member=vice_captain,
            role=TeamRoleChoices.PLAYER,
            is_vice_captain=True,
        )
        head_manager = MemberFactory.create_head_manager()
        RosterMember.objects.create(
            team=roster,
            member=head_manager,
            role=TeamRoleChoices.MANAGER,
            is_head_manager=True,
        )
        manager1 = MemberFactory.create_manager()
        RosterMember.objects.create(
            team=roster, member=manager1, role=TeamRoleChoices.MANAGER
        )
        manager2 = MemberFactory.create_manager()
        RosterMember.objects.create(
            team=roster, member=manager2, role=TeamRoleChoices.MANAGER
        )
        players = [MemberFactory.create_normal() for _ in range(4)]
        for player in players:
            RosterMember.objects.create(
                team=roster, member=player, role=TeamRoleChoices.PLAYER
            )
        head_coach = MemberFactory.create_head_coach()
        RosterMember.objects.create(
            team=roster,
            member=head_coach,
            role=TeamRoleChoices.COACH,
            is_head_coach=True,
        )

        return roster
