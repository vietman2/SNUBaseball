import pytest
from botocore.exceptions import ClientError

from apps.media.storage.services import verify_head
from core.error_handling import SNUBaseballException


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
    # boto3.client 패치
    mocker.patch(
        "apps.media.storage.services.verify_head.get_client", return_value=client
    )
    return client


def test_verify_head_success(fake_client):
    out = verify_head("path/to/file.png")
    print(out)
    assert out == {
        "size": 123,
        "content_type": "image/png",
        "etag": 'etag-123',
    }
    fake_client.head_object.assert_called_once_with(
        Bucket="bucket-name", Key="path/to/file.png"
    )


@pytest.mark.parametrize("code", ["404", "NoSuchKey", "NotFound"])
def test_verify_head_not_found_raises_domain_error(fake_client, code):
    fake_client.head_object.side_effect = ClientError(
        {"Error": {"Code": code, "Message": "x"}}, "HeadObject"
    )

    with pytest.raises(SNUBaseballException) as e:
        verify_head("missing/key")
    assert "업로드된 파일을 찾을 수 없습니다." in str(e.value)


def test_verify_head_no_permission(fake_client):
    fake_client.head_object.side_effect = ClientError(
        {"Error": {"Code": "403", "Message": "Forbidden"}}, "HeadObject"
    )

    with pytest.raises(SNUBaseballException) as e:
        verify_head("any/key")
    assert "파일에 접근할 권한이 없습니다." in str(e.value)


def test_verify_head_no_file(fake_client):
    fake_client.head_object.side_effect = ClientError(
        {"Error": {"Code": "400", "Message": "Bad Request"}}, "HeadObject"
    )

    with pytest.raises(SNUBaseballException) as e:
        verify_head("any/key")
    assert "파일 정보를 가져오는 데 실패했습니다." in str(e.value)


def test_verify_head_etag_not_string(fake_client):
    fake_client.head_object.return_value = {
        "ContentLength": 123,
        "ContentType": "image/png",
        "ETag": None,
    }

    out = verify_head("path/to/file.png")
    assert out == {
        "size": 123,
        "content_type": "image/png",
        "etag": None,
    }
