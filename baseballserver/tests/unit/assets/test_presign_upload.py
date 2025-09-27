import posixpath
import pytest

from apps.media.assets.services import presign_upload
from core.error_handling import SNUBaseballException
from tests.factories import SNUBaseballAssetFactory, SNUBaseballImageFactory, SNUBaseballVideoFactory

pytestmark = pytest.mark.django_db


@pytest.fixture(name="existing_files", autouse=True)
def _existing_files():
    # 기존에 존재하는 파일들
    SNUBaseballImageFactory(
        file__key="tests/existing_image.png",
        file__mime="image/png",
        width=800,
        height=600,
    )
    SNUBaseballVideoFactory(
        file__key="tests/existing_video.mp4",
        file__mime="video/mp4",
        duration=30,
    )
    SNUBaseballAssetFactory(
        file__key="tests/existing_file.pdf",
        file__mime="application/pdf",
    )


def test_presign_upload_success():
    out = presign_upload(
        key="tests/My Pic.png",
        content_type=None,  # 확장자로부터 image/png 추론
        size=1234,
    )

    assert out["url"].startswith("https://")
    assert "fields" in out


def test_presign_upload_success_pdf():
    out = presign_upload(
        key="tests/document.pdf",
        content_type="application/pdf",
        size=2048,
    )

    assert out["url"].startswith("https://")
    assert "fields" in out


def test_presign_upload_rejects_disallowed_prefix():
    with pytest.raises(SNUBaseballException) as e:
        presign_upload("notallowed/a.png", "image/png", 100)
    assert "키 접두사" in str(e.value)


def test_presign_upload_rejects_disallowed_mime():
    with pytest.raises(SNUBaseballException) as e:
        presign_upload("tests/a.exe", "application/x-msdownload", 100)
    assert "MIME" in str(e.value)


def test_presign_upload_prevents_type_change_type():
    with pytest.raises(SNUBaseballException) as e:
        presign_upload("tests/existing_image.png", "video/mp4", 2048)
    assert "파일 유형이 일치하지 않습니다." in str(e.value)

    with pytest.raises(SNUBaseballException) as e:
        presign_upload("tests/existing_video.mp4", "application/pdf", 2048)
    assert "파일 유형이 일치하지 않습니다." in str(e.value)

    with pytest.raises(SNUBaseballException) as e:
        presign_upload("tests/existing_file.pdf", "image/png", 2048)
    assert "파일 유형이 일치하지 않습니다." in str(e.value)


def test_presign_upload_allows_same_type_when_exists():
    out = presign_upload(
        key="tests/existing_image.png",
        content_type="image/png",
        size=1234,
    )
    assert out["fields"]["key"] == posixpath.join("tests/", "existing_image.png")
