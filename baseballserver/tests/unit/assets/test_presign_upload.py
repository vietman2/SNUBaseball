import posixpath
import pytest

from apps.media.assets.models import (
    SNUBaseballAsset,
    SNUBaseballImage,
    SNUBaseballVideo,
)
from apps.media.assets.services import presign_upload
from core.error_handling import SNUBaseballException
from tests.factories import UserFactory

pytestmark = pytest.mark.django_db

MODULE_PATH = "apps.media.assets.services"


@pytest.fixture(name="existing_files", autouse=True)
def _existing_files():
    uploader = UserFactory()
    SNUBaseballImage.objects.create(
        key="tests/existing_image.png",
        original_filename="existing_image.png",
        mime="image/png",
        size=123,
        uploaded_by=uploader,
    )
    SNUBaseballVideo.objects.create(
        key="tests/existing_video.mp4",
        original_filename="existing_video.mp4",
        mime="video/mp4",
        size=456,
        uploaded_by=uploader,
    )
    SNUBaseballAsset.objects.create(
        key="tests/existing_file.pdf",
        original_filename="existing_file.pdf",
        mime="application/pdf",
        size=789,
        uploaded_by=uploader,
    )


def test_presign_upload_success():
    out = presign_upload(
        prefix="tests/",
        filename="My Pic.png",
        content_type=None,  # 확장자로부터 image/png 추론
        size=1234,
    )

    assert out["url"].startswith("https://")
    assert "fields" in out


def test_presign_upload_success_pdf():
    out = presign_upload(
        prefix="tests/",
        filename="document.pdf",
        content_type="application/pdf",
        size=2048,
    )

    assert out["url"].startswith("https://")
    assert "fields" in out


def test_presign_upload_rejects_disallowed_prefix():
    with pytest.raises(SNUBaseballException) as e:
        presign_upload("private/", "a.png", "image/png", 100)
    assert "키 접두사" in str(e.value)


def test_presign_upload_rejects_disallowed_mime():
    with pytest.raises(SNUBaseballException) as e:
        presign_upload("tests/", "a.exe", "application/x-msdownload", 100)
    assert "MIME" in str(e.value)


def test_presign_upload_prevents_type_change_type():
    with pytest.raises(SNUBaseballException) as e:
        presign_upload("tests/", "existing_image.png", "video/mp4", 2048)
    assert "파일 유형이 일치하지 않습니다." in str(e.value)

    with pytest.raises(SNUBaseballException) as e:
        presign_upload("tests/", "existing_video.mp4", "application/pdf", 2048)
    assert "파일 유형이 일치하지 않습니다." in str(e.value)

    with pytest.raises(SNUBaseballException) as e:
        presign_upload("tests/", "existing_file.pdf", "image/png", 2048)
    assert "파일 유형이 일치하지 않습니다." in str(e.value)


def test_presign_upload_allows_same_type_when_exists():
    out = presign_upload(
        prefix="tests/",
        filename="existing_image.png",
        content_type="image/png",
        size=1234,
    )
    assert out["fields"]["key"] == posixpath.join("tests/", "existing_image.png")
