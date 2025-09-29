import types
import pytest

from apps.media.assets.services import complete_upload
from core.error_handling import SNUBaseballException
from tests.factories import UserFactory


pytestmark = pytest.mark.django_db

MODULE_PATH = complete_upload.__module__


@pytest.fixture(autouse=True)
def _prepare_mocks(mocker):
    # verify_head: 키에 따라 다른 값
    def vh(key):
        if key.endswith(".png"):
            return {"size": 1234, "content_type": "image/png", "etag": '"etag"'}
        if key.endswith(".mp4"):
            return {"size": 77, "content_type": "video/mp4", "etag": '"etag"'}
        return {"size": 10, "content_type": "application/pdf", "etag": '"etag"'}

    mocker.patch(f"{MODULE_PATH}.verify_head", side_effect=vh)

    # 서비스 모듈 네임스페이스에서 클래스 패치(중요!)
    img_model = mocker.patch(f"{MODULE_PATH}.SNUBaseballImage")
    vid_model = mocker.patch(f"{MODULE_PATH}.SNUBaseballVideo")
    ast_model = mocker.patch(f"{MODULE_PATH}.SNUBaseballAsset")

    def make_obj(key, kwargs):
        file = types.SimpleNamespace(
            key=key,
            original_filename=kwargs.get("original_filename"),
            mime=kwargs.get("mime"),
            size=kwargs.get("size"),
        )
        return types.SimpleNamespace(
            file=file,
            uploaded_by_id=getattr(kwargs.get("uploaded_by"), "pk", None),
        )

    def side(kind):
        def _fn(*, key=None, **kwargs):
            return make_obj(key, kwargs), True

        return _fn

    img_model.objects.update_or_create_by_key.side_effect = side("IMAGE")
    vid_model.objects.update_or_create_by_key.side_effect = side("VIDEO")
    ast_model.objects.update_or_create_by_key.side_effect = side("ASSET")


@pytest.fixture(name="file_type")
def _file_type(mocker):
    return mocker.patch("apps.media.assets.services.complete_upload.get_file_type")


@pytest.fixture(name="existing_file_type")
def _existing_file_type(mocker):
    return mocker.patch(
        "apps.media.assets.services.complete_upload.get_existing_file_type"
    )


def test_complete_upload_rejects_invalid_key():
    uploader = UserFactory()
    with pytest.raises(SNUBaseballException) as e:
        complete_upload(
            "invalid_prefix/file.png",
            "expected_prefix/",
            original_filename="file.png",
            uploaded_by=uploader,
        )
    assert "유효하지 않은 키입니다." in str(e.value)


def test_complete_upload_filetype_mismatch_raises(file_type, existing_file_type):
    file_type.return_value = "VIDEO"
    existing_file_type.return_value = "IMAGE"
    uploader = UserFactory()

    with pytest.raises(SNUBaseballException) as e:
        complete_upload(
            "tests/mismatch.png",
            "tests/",
            original_filename="vid.mp4",
            uploaded_by=uploader,
        )
    assert "파일 유형이 일치하지 않습니다." in str(e.value)


def test_complete_upload_image(file_type, existing_file_type):
    file_type.return_value = "IMAGE"
    existing_file_type.return_value = None  # 새 키
    uploader = UserFactory()
    obj = complete_upload(
        "tests/p.png", "tests/", original_filename="p.png", uploaded_by=uploader
    )

    assert obj.file.key == "tests/p.png"
    assert obj.file.mime == "image/png"
    assert obj.file.size == 1234
    assert obj.file.original_filename == "p.png"
    assert obj.uploaded_by_id == uploader.pk


def test_complete_upload_video(file_type, existing_file_type):
    file_type.return_value = "VIDEO"
    existing_file_type.return_value = None  # 새 키
    uploader = UserFactory()
    obj = complete_upload(
        "tests/v.mp4", "tests/", original_filename="v.mp4", uploaded_by=uploader
    )

    assert obj.file.key == "tests/v.mp4"
    assert obj.file.mime == "video/mp4"
    assert obj.file.size == 77


def test_complete_upload_asset(file_type, existing_file_type):
    file_type.return_value = "ASSET"
    existing_file_type.return_value = None  # 새 키
    uploader = UserFactory()
    obj = complete_upload(
        "tests/doc.pdf", "tests/", original_filename="doc.pdf", uploaded_by=uploader
    )

    assert obj.file.key == "tests/doc.pdf"
    assert obj.file.mime == "application/pdf"
    assert obj.file.size == 10
