import pytest
from botocore.exceptions import ClientError

from apps.media.assets.models import (
    SNUBaseballAsset,
    SNUBaseballImage,
    SNUBaseballVideo,
)
from apps.media.assets.services import complete_upload
from core.error_handling import SNUBaseballException
from tests.factories import UserFactory


pytestmark = pytest.mark.django_db


@pytest.fixture(autouse=True, name="s3_client")
def _s3_client(mocker):
    client = mocker.Mock()
    client.head_object.return_value = {
        "ContentLength": 1234,
        "ContentType": "image/png",
        "ETag": '"etag-1234"',
    }
    mocker.patch(
        "apps.media.storage.services.verify_head.get_client", return_value=client
    )
    return client


def test_complete_upload_image():
    uploader = UserFactory()
    obj = complete_upload(
        "tests/p.png", "tests/", original_filename="p.png", uploaded_by=uploader
    )

    assert isinstance(obj, SNUBaseballImage)
    assert obj.file.key == "tests/p.png"
    assert obj.file.mime == "image/png"
    assert obj.file.size == 1234
    assert obj.file.original_filename == "p.png"
    assert obj.uploaded_by_id == uploader.pk


def test_complete_upload_video(s3_client):
    s3_client.head_object.return_value = {
        "ContentLength": 77,
        "ContentType": "video/mp4",
        "ETag": '"etag-v"',
    }
    uploader = UserFactory()
    obj = complete_upload(
        "tests/v.mp4", "tests/", original_filename="v.mp4", uploaded_by=uploader
    )

    assert isinstance(obj, SNUBaseballVideo)
    assert obj.file.key == "tests/v.mp4"
    assert obj.file.mime == "video/mp4"
    assert obj.file.size == 77


def test_complete_upload_pdf_with_fallback_guess(s3_client):
    # 헤더에 content_type 없음 → 키 확장자로 추론 (application/pdf)
    s3_client.head_object.return_value = {
        "ContentLength": 10,
        "ContentType": None,
        "ETag": '"etag-pdf"',
    }
    uploader = UserFactory()
    obj = complete_upload(
        "tests/doc.pdf", "tests/", original_filename="doc.pdf", uploaded_by=uploader
    )

    assert isinstance(obj, SNUBaseballAsset)
    assert obj.file.key == "tests/doc.pdf"
    assert obj.file.mime == "application/pdf"
    assert obj.file.size == 10


def test_complete_upload_rejects_disallowed_mime(s3_client):
    s3_client.head_object.return_value = {
        "ContentLength": 1,
        "ContentType": "application/x-msdownload",
        "ETag": '"etag-exe"',
    }
    uploader = UserFactory()

    with pytest.raises(SNUBaseballException) as e:
        complete_upload(
            "tests/a.exe", "tests/", original_filename="a.exe", uploaded_by=uploader
        )
    assert "MIME" in str(e.value)


def test_complete_upload_updates_existing_record(s3_client):
    uploader = UserFactory()
    key = "tests/existing.png"

    # 최초 업로드(작은 사이즈)
    obj1 = complete_upload(
        key, "tests/", original_filename="old.png", uploaded_by=uploader
    )
    assert isinstance(obj1, SNUBaseballImage)
    assert obj1.file.size == 1234

    # 두 번째 업로드: HEAD 응답 사이즈 변경 -> update_or_create로 갱신되는지 확인
    s3_client.head_object.return_value = {
        "ContentLength": 9999,
        "ContentType": "image/png",
        "ETag": '"etag-new"',
    }
    obj2 = complete_upload(
        key, "tests/", original_filename="new.png", uploaded_by=uploader
    )

    assert obj2.pk == obj1.pk  # 같은 레코드 갱신
    obj2.refresh_from_db()
    assert obj2.file.size == 9999
    assert obj2.file.original_filename == "new.png"


def test_complete_upload_filetype_mismatch_raises(s3_client):
    # 기존에 IMAGE로 저장된 키에, VIDEO 업로드 시도 → 에러
    uploader = UserFactory()
    key = "tests/mismatch.png"
    obj1 = complete_upload(
        key, "tests/", original_filename="img.png", uploaded_by=uploader
    )
    assert isinstance(obj1, SNUBaseballImage)

    s3_client.head_object.return_value = {
        "ContentLength": 5000,
        "ContentType": "video/mp4",
        "ETag": '"etag-video"',
    }
    with pytest.raises(SNUBaseballException) as e:
        complete_upload(
            key, "tests/", original_filename="vid.mp4", uploaded_by=uploader
        )
    assert "파일 유형이 일치하지 않습니다." in str(e.value)


def test_complete_upload_missing_key_raises(s3_client):
    # S3에서 404류 에러 → 도메인 예외 메시지 매핑
    s3_client.head_object.side_effect = ClientError(
        {"Error": {"Code": "404", "Message": "Not found"}}, "HeadObject"
    )
    uploader = UserFactory()

    with pytest.raises(SNUBaseballException) as e:
        complete_upload(
            "tests/missing.png",
            "tests/",
            original_filename="x.png",
            uploaded_by=uploader,
        )
    assert "업로드된 파일을 찾을 수 없습니다." in str(e.value)


def test_complete_upload_head_other_error_raises_generic(s3_client):
    s3_client.head_object.side_effect = ClientError(
        {"Error": {"Code": "403", "Message": "Forbidden"}}, "HeadObject"
    )
    uploader = UserFactory()

    with pytest.raises(SNUBaseballException) as e:
        complete_upload(
            "tests/forbidden.png",
            "tests/",
            original_filename="x.png",
            uploaded_by=uploader,
        )
    assert "파일에 접근할 권한이 없습니다." in str(e.value)
