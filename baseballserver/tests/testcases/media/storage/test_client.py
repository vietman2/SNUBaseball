import pytest

from apps.media.storage.services.client import get_client


@pytest.fixture(name="s3_client")
def _s3_client(mocker):
    mock = mocker.patch("boto3.client")
    instance = mock.return_value
    instance.generate_presigned_post.return_value = {
        "url": "https://s3.test/presigned",
        "fields": {"key": "k"},
    }
    instance.head_object.return_value = {
        "ContentLength": 1234,
        "ContentType": "image/png",
        "ETag": "etag-1234",
    }
    return instance


def test_s3_client_singleton(s3_client):
    c1 = get_client()
    c2 = get_client()
    assert c1 is c2
    assert c1 is s3_client
