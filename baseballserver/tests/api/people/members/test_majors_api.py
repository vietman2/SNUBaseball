import pytest


pytestmark = pytest.mark.django_db


def test_majors_list(api_client):
    resp = api_client.get("/api/v1/majors/")
    assert resp.status_code == 200
    assert len(resp.data) >= 1  # 적어도 하나 이상의 전공이 있어야 함
