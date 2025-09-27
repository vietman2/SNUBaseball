import pytest

from apps.media.storage.services import presign_post
from core.error_handling import SNUBaseballException


@pytest.fixture(name="fake_client")
def _fake_client(mocker):
    """boto3 client를 대체할 간단한 스텁"""
    client = mocker.Mock()
    # 기본 성공 응답
    client.generate_presigned_post.return_value = {
        "url": "https://s3.test/presigned",
        "fields": {"key": "k"},
    }
    # boto3.client 패치
    mocker.patch(
        "apps.media.storage.services.presign_post.get_client", return_value=client
    )
    return client


# ---------- presign_post ----------


def test_presign_post_success(fake_client):
    res = presign_post(key="tests/a.png", content_type="image/png", size=1024)
    assert res == {"url": "https://s3.test/presigned", "fields": {"key": "k"}}

    # generate_presigned_post 호출 인자 검증
    args, kwargs = fake_client.generate_presigned_post.call_args
    # bucket, key는 위치인자
    assert args[0] == "bucket-name"
    assert args[1] == "tests/a.png"

    fields = kwargs["Fields"]
    conditions = kwargs["Conditions"]
    assert fields["Content-Type"] == "image/png"
    assert fields["success_action_status"] == "201"
    # 조건에 필요한 항목들 포함 확인(순서 무관)
    assert {"Content-Type": "image/png"} in conditions
    assert {"success_action_status": "201"} in conditions
    assert {"key": "tests/a.png"} in conditions
    # content-length-range 조건 확인
    assert any(
        cond[:2] == ["content-length-range", 1]
        for cond in conditions
        if isinstance(cond, list)
    )


def test_presign_post_rejects_size_zero(fake_client):
    with pytest.raises(SNUBaseballException):
        presign_post("a/b", "application/octet-stream", 0)
    # 클라이언트 호출 안 됨
    fake_client.generate_presigned_post.assert_not_called()


def test_presign_post_respects_custom_max_size(settings):
    settings.MEDIA_UPLOAD_MAX_SIZE = 1024  # 1KB
    # 경계값 허용
    presign_post("tests/b", "image/png", 1024)
    # 초과는 거부
    with pytest.raises(SNUBaseballException):
        presign_post("tests/b", "image/png", 1025)
