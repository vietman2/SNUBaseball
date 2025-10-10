import pytest

from tests.factories import TeamRosterFactory

pytestmark = pytest.mark.django_db


def test_team_roster_str():
    roster = TeamRosterFactory.create_team_roster(year=2025, semester="1")
    assert str(roster) == "2025 1학기"


def test_roster_member_str():
    roster = TeamRosterFactory.create_team_roster(year=2025, semester="1")
    member = roster.roster_members.first()
    assert str(member) == f"{roster.year}-{roster.semester} {member.member.name}"
