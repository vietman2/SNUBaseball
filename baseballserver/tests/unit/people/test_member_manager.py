import pytest

from apps.people.members.models import Member
from tests.factories import MemberFactory

pytestmark = pytest.mark.django_db


@pytest.fixture
def test_data():
    ## 주장, 수석매니저, 지도교수, 감독 각 1명씩
    ## 선수 5명, 매니저 3명 생성 (Active)
    ## Inactive한 선수 1명 생성
    MemberFactory.create_captain(name="김주장")
    MemberFactory.create_head_manager(name="이수석")
    MemberFactory.create_professor(name="박교수")
    MemberFactory.create_head_coach(name="최감독")
    for i in range(5):
        MemberFactory.create_normal(name=f"선수{i+1}")
    for i in range(3):
        MemberFactory.create_manager(name=f"매니저{i+1}")
    MemberFactory.create_military(name="군휴학부원")


def test_active_students(test_data):
    students = Member.objects.active_students()
    assert students.count() == 10  # 주장, 수석매니저, 선수5명, 매니저3명


def test_active_players(test_data):
    players = Member.objects.active_players()
    assert players.count() == 6  # 주장, 선수5명


def test_active_managers(test_data):
    managers = Member.objects.active_managers()
    assert managers.count() == 4  # 수석매니저, 매니저3명
