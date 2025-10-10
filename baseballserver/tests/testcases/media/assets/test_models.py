import pytest
from django.conf import settings

from tests.factories import (
    SNUBaseballAssetFactory,
    SNUBaseballImageFactory,
    SNUBaseballVideoFactory,
)

pytestmark = pytest.mark.django_db


def test_asset_str():
    asset = SNUBaseballAssetFactory(file__key="test_key")
    assert str(asset) == "test_key"
    expected_url = f"{asset.url}"
    assert asset.type == "ASSET"
    assert asset.url == expected_url


def test_image_str():
    image = SNUBaseballImageFactory(file__key="test_image_key")
    assert str(image) == "test_image_key"
    assert image.type == "IMAGE"
    expected_url = f"{image.url}"
    assert image.url == expected_url


def test_video_str():
    video = SNUBaseballVideoFactory(file__key="test_video_key")
    assert str(video) == "test_video_key"
    assert video.type == "VIDEO"
    expected_url = f"{video.url}"
    assert video.url == expected_url
    assert video.thumbnail_url == ""

def test_video_with_thumbnail_str():
    video = SNUBaseballVideoFactory(file__key="test_video_key", thumbnail_key="thumb_key")
    assert video.thumbnail_url == f"{settings.MEDIA_CDN_BASE_URL}/thumb_key"
