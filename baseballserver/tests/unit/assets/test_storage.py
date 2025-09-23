import pytest
from botocore.exceptions import ClientError

from apps.media.assets.storage import verify_head, presign_post

MODULE_PATH = "apps.media.assets.storage"


@pytest.fixture(name="fake_client")
def _fake_client(mocker):
    """boto3 client를 대체할 간단한 스텁"""
    client = mocker.Mock()
    # 기본 성공 응답
    client.head_object.return_value = {
        "ContentLength": 123,
        "ContentType": "image/png",
        "ETag": '"etag-123"',
    }
    client.generate_presigned_post.return_value = {
        "url": "https://s3.test/presigned",
        "fields": {"key": "k"},
    }
    # boto3.client 패치
    mocker.patch(f"{MODULE_PATH}.boto3.client", return_value=client)
    return client


def test_verify_head_success(fake_client):
    out = verify_head("path/to/file.png")
    assert out == {
        "size": 123,
        "content_type": "image/png",
        "etag": '"etag-123"',
    }
    fake_client.head_object.assert_called_once_with(
        Bucket="bucket-name", Key="path/to/file.png"
    )


@pytest.mark.parametrize("code", ["404", "NoSuchKey", "NotFound"])
def test_verify_head_not_found_raises_domain_error(fake_client, code):
    fake_client.head_object.side_effect = ClientError(
        {"Error": {"Code": code, "Message": "x"}}, "HeadObject"
    )
    from core.error_handling import SNUBaseballException

    with pytest.raises(SNUBaseballException) as e:
        verify_head("missing/key")
    assert "업로드된 파일을 찾을 수 없습니다." in str(e.value)


def test_verify_head_other_client_error_maps_to_generic_message(fake_client):
    fake_client.head_object.side_effect = ClientError(
        {"Error": {"Code": "403", "Message": "Forbidden"}}, "HeadObject"
    )
    from core.error_handling import SNUBaseballException

    with pytest.raises(SNUBaseballException) as e:
        verify_head("any/key")
    assert "파일 정보를 가져오는 데 실패했습니다." in str(e.value)


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
    from core.error_handling import SNUBaseballException

    with pytest.raises(SNUBaseballException):
        presign_post("a/b", "application/octet-stream", 0)
    # 클라이언트 호출 안 됨
    fake_client.generate_presigned_post.assert_not_called()


def test_presign_post_respects_custom_max_size(settings):
    from core.error_handling import SNUBaseballException

    settings.MEDIA_UPLOAD_MAX_SIZE = 1024  # 1KB
    # 경계값 허용
    presign_post("a/b", "image/png", 1024)
    # 초과는 거부
    with pytest.raises(SNUBaseballException):
        presign_post("a/b", "image/png", 1025)
