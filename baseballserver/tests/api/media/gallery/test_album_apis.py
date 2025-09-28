import pytest

from core.error_handling import SNUBaseballException
from tests.factories import GalleryFactory, SNUBaseballImageFactory, UserFactory

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
    assert resp.data["message"] == "자격 인증 데이터가 제공되지 않았습니다."


def test_get_album_detail_private_authenticated_forbidden_client(api_client, users):
    normal_user, _ = users
    api_client.force_authenticate(user=normal_user)

    resp = api_client.get(
        "/api/v1/gallery/albums/2/", headers={"X-SNUBASEBALL-CLIENT": "unknown"}
    )

    assert resp.status_code == 403
    assert resp.data["message"] == "이 작업을 수행할 권한이 없습니다."


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


def test_album_media_upload_presign(api_client, users, monkeypatch):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    monkeypatch.setattr(
        "apps.media.gallery.services.presign_upload",
        lambda **kwargs: {
            "url": f"https://s3.test/presigned/{kwargs['key']}",
            "fields": {"key": kwargs["key"]},
        },
    )

    payload = {
        "filename": "test_image.jpg",
        "content_type": "image/jpeg",
        "size": 1024,
    }

    resp = api_client.post(
        "/api/v1/gallery/albums/1/upload/presign/",
        data=payload,
        format="json",
    )

    assert resp.status_code == 200
    assert "url" in resp.data
    assert resp.data["fields"]["key"].startswith("gallery/public album/")


def test_presign_missing_fields(api_client, users):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    payload = {
        "size": 1024,
    }

    resp = api_client.post(
        "/api/v1/gallery/albums/1/upload/presign/",
        data=payload,
        format="json",
    )

    assert resp.status_code == 400


def test_album_media_upload_complete(api_client, users, monkeypatch):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    key = "gallery/public album/test_image.jpg"

    monkeypatch.setattr(
        "apps.media.gallery.services.complete_upload",
        lambda **kwargs: SNUBaseballImageFactory(file__key=kwargs["key"]),
    )

    complete_payload = {
        "items": [
            {
                "key": key,
                "original_filename": "test_image.jpg",
            }
        ],
        "tag_ids": [],
    }

    complete_resp = api_client.post(
        "/api/v1/gallery/albums/1/upload/complete/",
        data=complete_payload,
        format="json",
    )

    assert complete_resp.status_code == 204


def test_album_media_upload_complete_partial_failure(api_client, users, monkeypatch):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    key_valid = "gallery/public album/test_image.jpg"
    key_invalid = "gallery/public album/invalid_image.jpg"

    def mock_complete_upload(**kwargs):
        if kwargs["key"] == key_valid:
            return SNUBaseballImageFactory(file__key=kwargs["key"])
        else:
            raise SNUBaseballException("NOT_FOUND", "파일을 찾을 수 없습니다.")

    monkeypatch.setattr(
        "apps.media.gallery.services.complete_upload",
        mock_complete_upload,
    )

    complete_payload = {
        "items": [
            {
                "key": key_valid,
                "original_filename": "test_image.jpg",
            },
            {
                "key": key_invalid,
                "original_filename": "invalid_image.jpg",
            },
        ],
        "tag_ids": [],
    }

    complete_resp = api_client.post(
        "/api/v1/gallery/albums/1/upload/complete/",
        data=complete_payload,
        format="json",
    )

    assert complete_resp.status_code == 207
    assert "errors" in complete_resp.data
    assert len(complete_resp.data["errors"]) == 1
    assert complete_resp.data["errors"][0]["key"] == key_invalid


def test_complete_upload_missing_fields(api_client, users):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    complete_payload = {
        "items": [
            {
                # "key" is missing
                "original_filename": "test_image.jpg",
            }
        ],
        "tag_ids": [],
    }

    complete_resp = api_client.post(
        "/api/v1/gallery/albums/1/upload/complete/",
        data=complete_payload,
        format="json",
    )

    assert complete_resp.status_code == 400
