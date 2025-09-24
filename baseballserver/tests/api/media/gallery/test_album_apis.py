import pytest

from tests.factories import GalleryFactory, UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture(autouse=True)
def setup():
    GalleryFactory.create_public_album(title="public album")
    GalleryFactory.create_private_album(title="private album")


@pytest.fixture(name="users")
def _users():
    normal_user = UserFactory.create_normal_account()
    admin_user = UserFactory.create_admin()

    return normal_user, admin_user


def test_get_albums_list(api_client):
    resp = api_client.get("/api/v1/gallery/albums/")

    assert resp.status_code == 200
    assert isinstance(resp.data, list)
    assert len(resp.data) == 1
    assert resp.data[0]["title"] == "public album"


def test_get_album_detail_public(api_client):
    resp = api_client.get("/api/v1/gallery/albums/1/")

    assert resp.status_code == 200
    assert resp.data["album"]["title"] == "public album"
    assert isinstance(resp.data["media"], list)
    assert resp.data["total_media"] == 5


def test_get_album_detail_private_unauthenticated(api_client):
    resp = api_client.get("/api/v1/gallery/albums/2/")

    assert resp.status_code == 403
    assert resp.data["message"] == "접근 권한이 없습니다."


def test_get_album_detail_private_authenticated_forbidden_client(api_client, users):
    normal_user, _ = users
    api_client.force_authenticate(user=normal_user)

    resp = api_client.get(
        "/api/v1/gallery/albums/2/", headers={"X-SNUBASEBALL-CLIENT": "unknown"}
    )

    assert resp.status_code == 403
    assert resp.data["message"] == "접근 권한이 없습니다."


def test_get_album_detail_private_success(api_client, users):
    normal_user, _ = users
    api_client.force_authenticate(user=normal_user)

    resp = api_client.get(
        "/api/v1/gallery/albums/2/",
        headers={"X-SNUBASEBALL-CLIENT": "snu-baseball-team-portal"},
    )

    assert resp.status_code == 200
    assert resp.data["album"]["title"] == "private album"
    assert isinstance(resp.data["media"], list)
    assert resp.data["total_media"] == 0


def test_create_album_forbidden(api_client, users):
    normal_user, _ = users
    api_client.force_authenticate(user=normal_user)

    payload = {
        "title": "New Album",
        "description": "This is a new album.",
        "members_only": False,
    }

    resp = api_client.post(
        "/api/v1/gallery/albums/",
        data=payload,
        format="json",
        headers={"X-SNUBASEBALL-CLIENT": "snu-baseball-team-portal"},
    )

    assert resp.status_code == 403
    assert resp.data["message"] == "이 작업을 수행할 권한이 없습니다."


def test_create_album_success(api_client, users):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    payload = {
        "title": "New Album",
        "description": "This is a new album.",
        "members_only": False,
    }

    resp = api_client.post(
        "/api/v1/gallery/albums/",
        data=payload,
        format="json",
        headers={"X-SNUBASEBALL-CLIENT": "snu-baseball-team-portal"},
    )

    assert resp.status_code == 201
    assert resp.data["title"] == "New Album"
    assert resp.data["members_only"] is False
