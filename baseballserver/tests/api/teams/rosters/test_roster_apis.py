from datetime import datetime
import pytest
from django.utils import timezone

from tests.factories import TeamRosterFactory

pytestmark = pytest.mark.django_db


@pytest.fixture(autouse=True)
def setup(monkeypatch):
    tz = timezone.get_current_timezone()
    fake_now = timezone.make_aware(datetime(2025, 1, 1, 9, 0, 0), tz)
    monkeypatch.setattr(timezone, "now", lambda: fake_now)
    TeamRosterFactory.create_team_roster(year=2025, semester="1")


def test_get_roster_success(api_client):
    resp = api_client.get("/api/v1/teams/?semester=2025-1")
    assert resp.status_code == 200
    assert resp.data["code"] == "2025-1"
    assert len(resp.data["managers"]) == 3
    assert len(resp.data["players"]) == 6


def test_get_roster_default_semester(api_client):
    resp = api_client.get("/api/v1/teams/")
    assert resp.status_code == 200
    assert resp.data["code"] == "2025-1"
    assert len(resp.data["managers"]) == 3
    assert len(resp.data["players"]) == 6


def test_get_roster_invalid_param(api_client):
    resp = api_client.get("/api/v1/teams/?semester=invalid-param")
    assert resp.status_code == 400
    assert resp.data["detail"] == "파라미터 형식이 잘못되었습니다."


def test_get_roster_404(api_client):
    resp = api_client.get("/api/v1/teams/?semester=2024-2")
    assert resp.status_code == 404
    assert resp.data["detail"] == "해당 연도/학기의 팀 로스터가 존재하지 않습니다."


def test_get_router_member_success(api_client):
    ## 주장
    resp1 = api_client.get("/api/v1/teams/members/1/")
    assert resp1.status_code == 200
    assert resp1.data["role"] == "주장"

    ## 부주장
    resp2 = api_client.get("/api/v1/teams/members/2/")
    assert resp2.status_code == 200
    assert resp2.data["role"] == "부주장"

    ## 수석매니저
    resp3 = api_client.get("/api/v1/teams/members/3/")
    assert resp3.status_code == 200
    assert resp3.data["role"] == "수석매니저"

    ## 매니저
    resp4 = api_client.get("/api/v1/teams/members/4/")
    assert resp4.status_code == 200
    assert resp4.data["role"] == "매니저"

    ## 감독
    resp5 = api_client.get("/api/v1/teams/members/10/")
    assert resp5.status_code == 200
    assert resp5.data["role"] == "감독"


def test_get_roster_member_404(api_client):
    resp = api_client.get("/api/v1/teams/members/999/")
    assert resp.status_code == 404
    assert resp.data["detail"] == "해당 ID의 팀 로스터 멤버가 존재하지 않습니다."
