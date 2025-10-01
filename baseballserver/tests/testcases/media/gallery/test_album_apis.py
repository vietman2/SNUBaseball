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


ALBUMS_API_URL = "/api/v1/gallery/albums/"


def test_unallowed_methods(api_client, users):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    resp = api_client.patch(f"{ALBUMS_API_URL}public album/")
    assert resp.status_code == 405

    resp = api_client.get(f"{ALBUMS_API_URL}public album/")
    assert resp.status_code == 405


def test_get_albums_list_full_access(api_client, users):
    normal_user, _ = users
    api_client.force_authenticate(user=normal_user)

    resp = api_client.get(ALBUMS_API_URL)

    assert resp.status_code == 200
    assert isinstance(resp.data, list)
    assert len(resp.data) == 2
    titles = {album["title"] for album in resp.data}
    assert titles == {"public album", "private album"}


@pytest.mark.no_portal_header
def test_get_albums_list_limited_access(api_client, users):
    normal_user, _ = users
    api_client.force_authenticate(user=normal_user)

    resp = api_client.get(ALBUMS_API_URL)

    assert resp.status_code == 200
    assert isinstance(resp.data, list)
    assert len(resp.data) == 1
    titles = {album["title"] for album in resp.data}
    assert titles == {"public album"}

@pytest.mark.no_portal_header
def test_create_update_delete_unauthenticated(api_client, users):
    ## 1. not authenticated
    payload = {
        "title": "New Album",
        "members_only": False,
    }
    resp = api_client.post(
        ALBUMS_API_URL,
        data=payload,
        format="json",
    )
    assert resp.status_code == 403

    resp = api_client.put(
        f"{ALBUMS_API_URL}public album/", data=payload, format="json"
    )
    assert resp.status_code == 403

    resp = api_client.delete(f"{ALBUMS_API_URL}public album/")
    assert resp.status_code == 403

    ## 2. admin, but not portal client
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)
    resp = api_client.post(
        ALBUMS_API_URL,
        data=payload,
        format="json",
    )
    assert resp.status_code == 403

    resp = api_client.put(
        f"{ALBUMS_API_URL}public album/", data=payload, format="json"
    )
    assert resp.status_code == 403

    resp = api_client.delete(f"{ALBUMS_API_URL}public album/")
    assert resp.status_code == 403

    ## 3. normal user, portal client
    normal_user, _ = users
    api_client.force_authenticate(user=normal_user)
    resp = api_client.post(
        ALBUMS_API_URL,
        data=payload,
        format="json",
    )
    assert resp.status_code == 403

    resp = api_client.put(
        f"{ALBUMS_API_URL}public album/", data=payload, format="json"
    )
    assert resp.status_code == 403

    resp = api_client.delete(f"{ALBUMS_API_URL}public album/")
    assert resp.status_code == 403


def test_create_album_success(api_client, users):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    payload = {
        "title": "New Album",
        "description": "This is a new album.",
        "members_only": False,
    }

    resp = api_client.post(
        ALBUMS_API_URL,
        data=payload,
        format="json",
    )

    assert resp.status_code == 201
    assert resp.data["title"] == "New Album"
    assert resp.data["members_only"] is False


def test_update_album_success(api_client, users):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    payload = {
        "title": "Updated Album",
        "description": "This is an updated album.",
        "members_only": True,
    }

    resp = api_client.put(
        f"{ALBUMS_API_URL}public album/",
        data=payload,
        format="json",
    )

    assert resp.status_code == 200
    assert resp.data["title"] == "Updated Album"
    assert resp.data["members_only"] is True

def test_delete_album_not_implemented(api_client, users):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    resp = api_client.delete(f"{ALBUMS_API_URL}public album/")

    assert resp.status_code == 501
