import pytest

from apps.media.gallery.models import MediaTag
from apps.media.gallery.services import (
    complete_album_uploads,
    serialize_gallery_media,
    presign_for_album_item,
)
from core.error_handling import SNUBaseballException
from tests.factories import (
    GalleryFactory,
    SNUBaseballImageFactory,
    SNUBaseballVideoFactory,
)

pytestmark = pytest.mark.django_db


def test_presign_for_album_item():
    ## Presign의 결과는 conftest에서 mocking됨.
    album = GalleryFactory.create()
    filename = " test image.png "
    content_type = "image/png"
    size = 2048

    presign_data = presign_for_album_item(
        album, filename=filename, content_type=content_type, size=size
    )

    assert presign_data["url"] == "https://s3.test/presigned"
    assert "key" in presign_data["fields"]


def _mock_complete_upload(**kwargs):
    key = kwargs.get("key")

    if key.endswith(".jpg"):
        return SNUBaseballImageFactory(key=key)
    else:
        return SNUBaseballVideoFactory(key=key)


def test_complete_album_uploads_success(monkeypatch):
    monkeypatch.setattr(
        "apps.media.gallery.services.complete_upload", _mock_complete_upload
    )

    album = GalleryFactory.create()
    items = [
        {"key": f"gallery/{album.title}/image1.jpg", "original_filename": "image1.jpg"},
        {"key": f"gallery/{album.title}/video1.mp4", "original_filename": "video1.mp4"},
    ]
    errors = complete_album_uploads(album=album, items=items, tag_ids=[], user=None)
    assert errors == []
    assert album.images.count() == 1
    assert album.videos.count() == 1


def test_complete_album_uploads_with_tags(monkeypatch):
    monkeypatch.setattr(
        "apps.media.gallery.services.complete_upload", _mock_complete_upload
    )

    album = GalleryFactory.create_public_album()
    tag1 = MediaTag.objects.get(name="tag1")
    items = [
        {"key": f"gallery/{album.title}/image2.jpg", "original_filename": "image2.jpg"},
        {"key": f"gallery/{album.title}/video2.mp4", "original_filename": "video2.mp4"},
    ]
    errors = complete_album_uploads(
        album=album, items=items, tag_ids=[tag1.id], user=None
    )
    assert errors == []
    assert album.images.count() == 5
    image = album.images.first()
    assert set(image.tags.all()) == {tag1}

def test_complete_album_uploads_partial_failure(monkeypatch):
    def mock_complete_upload_partial_failure(**kwargs):
        key = kwargs.get("key")
        if "fail" in key:
            raise SNUBaseballException("Simulated failure")
        if key.endswith(".jpg"):
            return SNUBaseballImageFactory(key=key)
        else:
            return SNUBaseballVideoFactory(key=key)

    monkeypatch.setattr(
        "apps.media.gallery.services.complete_upload", mock_complete_upload_partial_failure
    )

    album = GalleryFactory.create()
    items = [
        {"key": f"gallery/{album.title}/image3.jpg", "original_filename": "image3.jpg"},
        {"key": f"gallery/{album.title}/fail_video.mp4", "original_filename": "fail_video.mp4"},
    ]
    errors = complete_album_uploads(album=album, items=items, tag_ids=[], user=None)
    assert len(errors) == 1
    assert errors[0]["key"] == f"gallery/{album.title}/fail_video.mp4"
    assert album.images.count() == 1
    assert album.videos.count() == 0

def test_gallery_media_serialization():
    album = GalleryFactory.create_public_album()
    serialized_images = serialize_gallery_media(album.images.all())
    assert len(serialized_images) == album.images.count()

    serialized_videos = serialize_gallery_media(album.videos.all())
    assert len(serialized_videos) == album.videos.count()


def test_gallery_media_serialization_invalid_type():
    with pytest.raises(SNUBaseballException):
        serialize_gallery_media([object()])
