import pytest

from apps.media.assets.services import presign_upload
from core.error_handling import SNUBaseballException
from tests.factories import (
    SNUBaseballAssetFactory,
    SNUBaseballImageFactory,
    SNUBaseballVideoFactory,
)

pytestmark = pytest.mark.django_db


@pytest.fixture(autouse=True, name="presign_post_api")
def _presign_post_api(mocker):
    # presign_post API 모킹
    mock = mocker.patch("apps.media.assets.services.presign_upload.presign_post")
    mock.return_value = {
        "url": "https://mocked-presign-url.com/upload",
        "fields": {
            "key": "mocked/key",
        },
    }
    return mock


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


## get_file_type, get_existing_file_type는 utils 테스트에서 검증
def test_presign_upload_success():
    out = presign_upload(
        key="tests/My Pic.png",
        content_type=None,  # 확장자로부터 image/png 추론
        size=1234,
    )

    assert out["url"] == "https://mocked-presign-url.com/upload"
    assert "fields" in out
    assert out["fields"]["key"] == "mocked/key"


def test_presign_upload_prevents_type_change_type():
    with pytest.raises(SNUBaseballException) as e:
        presign_upload("tests/existing_image.png", "video/mp4", 2048)
    assert "파일 유형이 일치하지 않습니다." in str(e.value)
