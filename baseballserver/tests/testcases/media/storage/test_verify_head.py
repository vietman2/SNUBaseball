import pytest
from botocore.exceptions import ClientError

from apps.media.storage.services import verify_head
from core.error_handling import SNUBaseballException


def test_verify_head_success(s3_client):
    out = verify_head("path/to/file.png")
    assert out == {
        "size": 1234,
        "content_type": "image/png",
        "etag": "etag-1234",
    }
    s3_client.head_object.assert_called_once_with(
        Bucket="bucket-name", Key="path/to/file.png"
    )


@pytest.mark.parametrize("code", ["404", "NoSuchKey", "NotFound"])
def test_verify_head_not_found_raises_domain_error(s3_client, code):
    s3_client.head_object.side_effect = ClientError(
        {"Error": {"Code": code, "Message": "x"}}, "HeadObject"
    )

    with pytest.raises(SNUBaseballException) as e:
        verify_head("missing/key")
    assert "업로드된 파일을 찾을 수 없습니다." in str(e.value)


def test_verify_head_no_permission(s3_client):
    s3_client.head_object.side_effect = ClientError(
        {"Error": {"Code": "403", "Message": "Forbidden"}}, "HeadObject"
    )

    with pytest.raises(SNUBaseballException) as e:
        verify_head("any/key")
    assert "파일에 접근할 권한이 없습니다." in str(e.value)


def test_verify_head_no_file(s3_client):
    s3_client.head_object.side_effect = ClientError(
        {"Error": {"Code": "400", "Message": "Bad Request"}}, "HeadObject"
    )

    with pytest.raises(SNUBaseballException) as e:
        verify_head("any/key")
    assert "파일 정보를 가져오는 데 실패했습니다." in str(e.value)


def test_verify_head_etag_not_string(s3_client):
    s3_client.head_object.return_value = {
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


def test_verify_head_invalid_mimetype(s3_client):
    s3_client.head_object.return_value = {
        "ContentLength": 123,
        "ContentType": "application/zip",
        "ETag": '"etag-123"',
    }

    with pytest.raises(SNUBaseballException) as e:
        verify_head("file.zip")
    assert "허용되지 않은 MIME 타입입니다." in str(e.value)
