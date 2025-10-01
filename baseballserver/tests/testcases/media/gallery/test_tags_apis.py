import pytest

from tests.factories import GalleryFactory, UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture(autouse=True)
def setup():
    GalleryFactory.create_public_album(title="public album")
    GalleryFactory.create_private_album(title="private album")


@pytest.fixture(name="user")
def _user():
    user = UserFactory.create_normal_account()
    return user


@pytest.fixture(name="admin")
def _admin():
    admin = UserFactory.create_admin()
    return admin


TAGS_API_URL = "/api/v1/gallery/tags/"
PORTAL_CLIENT_HEADER = {"HTTP_X_SNUBASEBALL_CLIENT": "snu-baseball-team-portal"}


def test_unallowed_methods(client, admin):
    client.force_login(admin)
    response = client.get(f"{TAGS_API_URL}1/")
    assert response.status_code == 405

    response = client.patch(f"{TAGS_API_URL}1/")
    assert response.status_code == 405


def test_list_tags_as_anonymous(client):
    response = client.get(TAGS_API_URL)
    assert response.status_code == 200
    assert (
        len(response.json()) == 2
    )  # 연결된 미디어가 없는 태그는 조회되지 않음. 따라서 2개


@pytest.mark.no_portal_header
def test_list_tags_as_user(client, user):
    client.force_login(user)
    response = client.get(TAGS_API_URL)
    assert response.status_code == 200
    assert len(response.json()) == 2


def test_list_tags_with_full_access(client, user):
    client.force_login(user)
    response = client.get(TAGS_API_URL, **PORTAL_CLIENT_HEADER)
    assert response.status_code == 200
    assert len(response.json()) == 3


@pytest.mark.no_portal_header
def test_create_update_delete_unauthorized(client, user, admin):
    ## 1. 비로그인 상태
    response = client.post(TAGS_API_URL, data={"name": "new tag"})
    assert response.status_code == 403

    response = client.put(f"{TAGS_API_URL}1/", data={"name": "updated tag"})
    assert response.status_code == 403

    response = client.delete(f"{TAGS_API_URL}1/")
    assert response.status_code == 403

    ## 2. 일반유저 (포털에서)
    client.force_login(user)
    response = client.post(
        TAGS_API_URL, data={"name": "new tag"}, **PORTAL_CLIENT_HEADER
    )
    assert response.status_code == 403

    response = client.put(
        f"{TAGS_API_URL}1/", data={"name": "updated tag"}, **PORTAL_CLIENT_HEADER
    )
    assert response.status_code == 403

    response = client.delete(f"{TAGS_API_URL}1/", **PORTAL_CLIENT_HEADER)
    assert response.status_code == 403

    ## 3. 운영진 (일반 웹에서)
    client.force_login(admin)
    response = client.post(TAGS_API_URL, data={"name": "new tag"})
    assert response.status_code == 403

    response = client.put(f"{TAGS_API_URL}1/", data={"name": "updated tag"})
    assert response.status_code == 403

    response = client.delete(f"{TAGS_API_URL}1/")
    assert response.status_code == 403


def test_create_tag(client, admin):
    client.force_login(admin)
    response = client.post(
        TAGS_API_URL, data={"name": "new tag"}, **PORTAL_CLIENT_HEADER
    )
    assert response.status_code == 201
    assert response.json()["name"] == "new tag"


def test_update_tag(client, admin):
    client.force_login(admin)
    response = client.put(
        f"{TAGS_API_URL}1/",
        data={"name": "updated tag"},
        **PORTAL_CLIENT_HEADER,
        content_type="application/json",
    )
    assert response.status_code == 200
    assert response.json()["name"] == "updated tag"


def test_delete_tag(client, admin):
    client.force_login(admin)
    response = client.delete(f"{TAGS_API_URL}1/", **PORTAL_CLIENT_HEADER)
    assert response.status_code == 204
