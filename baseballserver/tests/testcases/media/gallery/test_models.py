import pytest

from apps.media.gallery.models import Album, MediaTag
from tests.factories import GalleryFactory

pytestmark = pytest.mark.django_db


@pytest.fixture(autouse=True)
def setup_gallery():
    GalleryFactory.create_public_album(title="Public Album")

def test_album_str():
    album = Album.objects.all().first()
    assert str(album) == "Public Album"


def test_gallery_image_str():
    image = Album.objects.all().first().images.first()
    assert str(image) == "/media/gallery/images/sample_image_1.jpg"
    assert image.type == "IMAGE"


def test_gallery_video_str():
    video = Album.objects.all().first().videos.first()
    assert str(video) == "/media/gallery/videos/sample_video_1.mp4"
    assert video.type == "VIDEO"


def test_media_tag_str():
    tag = MediaTag.objects.all().first()
    assert str(tag) == "tag1"
