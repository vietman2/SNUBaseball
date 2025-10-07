import pytest

from core.error_handling import SNUBaseballException
from tests.factories import GalleryFactory, SNUBaseballImageFactory, UserFactory


pytestmark = pytest.mark.django_db

ALBUMS_API_URL = "/api/v1/gallery/albums/"


@pytest.fixture(autouse=True)
def setup():
    GalleryFactory.create_public_album(title="public album")
    GalleryFactory.create_private_album(title="private album")


@pytest.fixture(name="users")
def _users():
    normal_user = UserFactory.create_normal_account()
    admin_user = UserFactory.create_admin()

    return normal_user, admin_user


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
        f"{ALBUMS_API_URL}1/upload/presign/",
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
        f"{ALBUMS_API_URL}1/upload/complete/",
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
        f"{ALBUMS_API_URL}1/upload/complete/",
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
        f"{ALBUMS_API_URL}1/upload/complete/",
        data=complete_payload,
        format="json",
    )

    assert complete_resp.status_code == 400
