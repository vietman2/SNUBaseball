import pytest

from apps.media.gallery.models import Album, GalleryImage, GalleryVideo, MediaTag

pytestmark = pytest.mark.django_db


def test_album_str():
    album = Album.objects.create(title="Test Album")
    assert str(album) == "Test Album"


def test_gallery_image_str():
    image = GalleryImage.objects.create(key="path/to/image.jpg")
    assert str(image) == "path/to/image.jpg"
    assert image.type == "IMAGE"


def test_gallery_video_str():
    video = GalleryVideo.objects.create(key="path/to/video.mp4")
    assert str(video) == "path/to/video.mp4"
    assert video.type == "VIDEO"


def test_media_tag_str():
    tag = MediaTag.objects.create(name="Test Tag")
    assert str(tag) == "Test Tag"
