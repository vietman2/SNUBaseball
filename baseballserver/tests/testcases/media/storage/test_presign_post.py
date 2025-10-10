import pytest

from apps.media.storage.services import presign_post
from core.error_handling import SNUBaseballException


def test_presign_post_success():
    res = presign_post(key="tests/a.pdf", content_type="application/pdf", size=1024)
    assert res == {"url": "https://s3.test/presigned", "fields": {"key": "k"}}


def test_presign_post_invalid_key():
    with pytest.raises(SNUBaseballException) as e:
        presign_post("invalid_prefix/a.png", "image/png", 1024)
    assert "허용되지 않은 키 접두사입니다." in str(e.value)


def test_presign_post_invalid_mime():
    with pytest.raises(SNUBaseballException) as e:
        presign_post("tests/b", "application/invalid", 1024)
    assert "허용되지 않은 MIME 타입입니다." in str(e.value)


def test_presign_post_rejects_size_zero(s3_client):
    with pytest.raises(SNUBaseballException):
        presign_post("a/b", "application/octet-stream", 0)
    # 클라이언트 호출 안 됨
    s3_client.generate_presigned_post.assert_not_called()


def test_presign_post_respects_custom_max_size(settings):
    settings.MEDIA_UPLOAD_MAX_SIZE = 1024  # 1KB
    # 경계값 허용
    presign_post("tests/b", "image/png", 1024)
    # 초과는 거부
    with pytest.raises(SNUBaseballException):
        presign_post("tests/b", "image/png", 1025)
