import pytest

from apps.media.gallery.models.media import GalleryImage, GalleryVideo
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


def test_unauthenticated_fail(api_client, users):
    normal_user, _ = users

    image = GalleryImage.objects.first()
    video = GalleryVideo.objects.first()

    api_client.force_authenticate(user=normal_user)

    resp1 = api_client.delete(f"/api/v1/gallery/images/{image.id}/")
    assert resp1.status_code == 403

    resp2 = api_client.patch(
        f"/api/v1/gallery/images/{image.id}/",
        data={"album_id": 2, "tag_ids": [tag.id for tag in image.tags.all()]},
        format="json",
    )
    assert resp2.status_code == 403

    resp3 = api_client.delete(f"/api/v1/gallery/videos/{video.id}/")
    assert resp3.status_code == 403

    resp4 = api_client.patch(
        f"/api/v1/gallery/videos/{video.id}/",
        data={"album_id": 2, "tag_ids": [tag.id for tag in video.tags.all()]},
        format="json",
    )
    assert resp4.status_code == 403


def test_image_delete_success_admin(api_client, users):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    image = GalleryImage.objects.first()

    resp = api_client.delete(f"/api/v1/gallery/images/{image.id}/")
    assert resp.status_code == 204

    image.refresh_from_db()
    assert image.is_deleted is True
    assert image.deleted_at is not None


def test_image_update_success_admin(api_client, users):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    image = GalleryImage.objects.first()

    data = {
        "album_id": 2,  ## new album: private album
        "tag_ids": [tag.id for tag in image.tags.all()],  ## no change in tags
    }

    resp = api_client.patch(
        f"/api/v1/gallery/images/{image.id}/",
        data=data,
        format="json",
    )

    image.refresh_from_db()
    assert resp.status_code == 200
    assert resp.data["album"]["id"] == 2
    assert image.album.id == 2


def test_video_delete_success_admin(api_client, users):
    _, admin_user = users
    api_client.force_authenticate(user=admin_user)

    video = GalleryVideo.objects.first()

    resp = api_client.delete(f"/api/v1/gallery/videos/{video.id}/")
    assert resp.status_code == 204

    video.refresh_from_db()
    assert video.is_deleted is True
    assert video.deleted_at is not None


def test_video_update_success_uploader(api_client, users):
    normal_user, _ = users
    api_client.force_authenticate(user=normal_user)

    video = GalleryVideo.objects.first()
    video.video.uploaded_by = normal_user
    video.video.save()

    data = {
        "album_id": 2,  ## new album: private album
        "tag_ids": [tag.id for tag in video.tags.all()],  ## no change in tags
    }

    resp = api_client.patch(
        f"/api/v1/gallery/videos/{video.id}/",
        data=data,
        format="json",
    )

    video.refresh_from_db()
    assert resp.status_code == 200
    assert resp.data["album"]["id"] == 2
    assert video.album.id == 2
