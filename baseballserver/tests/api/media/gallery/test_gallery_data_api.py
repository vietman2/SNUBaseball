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


def test_get_gallery_data_success(api_client, user):
    api_client.force_authenticate(user=user)

    resp = api_client.get(
        "/api/v1/gallery/", headers={"X-SNUBASEBALL-CLIENT": "snu-baseball-team-portal"}
    )

    assert resp.status_code == 200
    assert "albums" in resp.data
    assert "tags" in resp.data

    assert len(resp.data["albums"]) == 2
    assert len(resp.data["tags"]) == 3


def test_get_gallery_data_unauthenticated(api_client):
    resp = api_client.get(
        "/api/v1/gallery/", headers={"X-SNUBASEBALL-CLIENT": "snu-baseball-team-portal"}
    )

    assert resp.status_code == 403
    assert resp.data["message"] == "자격 인증 데이터가 제공되지 않았습니다."


def test_get_gallery_data_forbidden_client(api_client, user):
    api_client.force_authenticate(user=user)

    resp = api_client.get(
        "/api/v1/gallery/", headers={"X-SNUBASEBALL-CLIENT": "unknown"}
    )

    assert resp.status_code == 403
    assert resp.data["message"] == "허용되지 않은 클라이언트입니다."
