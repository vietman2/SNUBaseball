import pytest
from django.core.exceptions import ValidationError

from apps.media.assets.models import (
    SNUBaseballAsset,
    SNUBaseballImage,
    SNUBaseballVideo,
)

pytestmark = pytest.mark.django_db


def test_asset_str():
    asset = SNUBaseballAsset.objects.create(key="test_key")
    assert str(asset) == "test_key"


def test_asset_url():
    asset = SNUBaseballAsset.objects.create(key="test_key")
    expected_url = f"{asset.url}"
    assert asset.url == expected_url


def test_image_clean():
    image = SNUBaseballImage(key="image_key", mime="image/png")
    try:
        image.clean()  # Should not raise
    except ValidationError:
        pytest.fail("SNUBaseballImage.clean() raised an exception unexpectedly!")

    image_invalid = SNUBaseballImage(key="image_key", mime="video/mp4")
    with pytest.raises(ValidationError):
        image_invalid.clean()


def test_video_clean():
    video = SNUBaseballVideo(key="video_key", mime="video/mp4")
    try:
        video.clean()  # Should not raise
    except ValidationError:
        pytest.fail("SNUBaseballVideo.clean() raised an exception unexpectedly!")

    video_invalid = SNUBaseballVideo(key="video_key", mime="image/png")
    with pytest.raises(ValidationError):
        video_invalid.clean()
