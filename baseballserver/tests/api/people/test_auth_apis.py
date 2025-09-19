import pytest
from rest_framework.test import APIClient

from tests.factories import UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user():
    return UserFactory.create_normal_account(
        username="testuser", password="Testpassword123@"
    )


def admin():
    return UserFactory.create_admin_account(
        username="adminuser", password="Adminpassword123@"
    )


def test_login_logout(api_client, user):
    login_res = api_client.post(
        "/api/v1/login/", {"username": "testuser", "password": "Testpassword123@"}
    )

    refresh = login_res.cookies["x_snubaseball_ref_tok"].value

    assert login_res.status_code == 200
    assert "access" in login_res.data
    assert "refresh" not in login_res.data

    refresh_res = api_client.post(
        "/api/v1/tokens/refresh/",
        **{"HTTP_COOKIE": f"x_snubaseball_ref_tok={refresh}"},
    )

    assert refresh_res.status_code == 200
    assert "access" in refresh_res.data
    assert "refresh" not in refresh_res.data

    new_refresh = refresh_res.cookies["x_snubaseball_ref_tok"].value

    logout_res = api_client.post(
        "/api/v1/logout/",
        **{"HTTP_COOKIE": f"x_snubaseball_ref_tok={new_refresh}"},
    )

    assert logout_res.status_code == 200


def test_login_invalid(api_client, user):
    login_res = api_client.post(
        "/api/v1/login/", {"username": "testuser", "password": "wrongpassword"}
    )

    assert login_res.status_code == 401


def test_login_inactive(api_client, user):
    user.is_active = False
    user.save()

    login_res = api_client.post(
        "/api/v1/login/", {"username": "testuser", "password": "Testpassword123@"}
    )

    assert login_res.status_code == 401


def test_logout_no_cookie(api_client):
    logout_res = api_client.post("/api/v1/logout/")

    assert logout_res.status_code == 401


def test_logout_invalid_cookie(api_client):
    logout_res = api_client.post(
        "/api/v1/logout/",
        **{"HTTP_COOKIE": "x_snubaseball_ref_tok=invalidtoken"},
    )

    assert logout_res.status_code == 401


def test_refresh_no_cookie(api_client):
    refresh_res = api_client.post("/api/v1/tokens/refresh/")

    assert refresh_res.status_code == 401


def test_refresh_invalid_cookie(api_client):
    refresh_res = api_client.post(
        "/api/v1/tokens/refresh/",
        **{"HTTP_COOKIE": "x_snubaseball_ref_tok=invalidtoken"},
    )

    assert refresh_res.status_code == 401
