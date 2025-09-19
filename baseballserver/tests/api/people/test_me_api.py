import pytest
from rest_framework.test import APIClient

from tests.factories import UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user():
    return UserFactory.create_normal_account()


def test_me(api_client, user):
    api_client.force_login(user=user)

    me_res = api_client.get("/api/v1/me/")
    assert me_res.status_code == 200
    assert me_res.data["username"] == "use****"


def test_me_unauthenticated(api_client):
    me_res = api_client.get("/api/v1/me/")

    assert me_res.status_code == 403
