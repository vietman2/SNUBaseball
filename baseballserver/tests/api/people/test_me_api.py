import pytest
from rest_framework.test import APIClient

from tests.factories import UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def users():
    normal_user = UserFactory.create_normal_account()
    admin_user = UserFactory.create_admin()
    leader_user = UserFactory.create_captain_account()
    staff_user = UserFactory.create_professor_account()

    return [normal_user, admin_user, leader_user, staff_user]


def test_me_normal_user(api_client, users):
    normal_user = users[0]
    api_client.force_login(user=normal_user)

    me_res = api_client.get("/api/v1/me/")
    assert me_res.status_code == 200
    assert me_res.data["username"] == "use****"

def test_me_admin_user(api_client, users):
    admin_user = users[1]
    api_client.force_login(user=admin_user)

    me_res = api_client.get("/api/v1/me/")
    assert me_res.status_code == 200
    assert me_res.data["role"] == "ADMIN"

def test_me_leader_user(api_client, users):
    leader_user = users[2]
    api_client.force_login(user=leader_user)

    me_res = api_client.get("/api/v1/me/")
    assert me_res.status_code == 200
    assert me_res.data["role"] == "LEADER"

def test_me_staff_user(api_client, users):
    staff_user = users[3]
    api_client.force_login(user=staff_user)

    me_res = api_client.get("/api/v1/me/")
    assert me_res.status_code == 200
    assert me_res.data["role"] == "STAFF"

def test_me_unauthenticated(api_client):
    me_res = api_client.get("/api/v1/me/")

    assert me_res.status_code == 403
