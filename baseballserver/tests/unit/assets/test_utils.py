import pytest

from apps.media.assets.models import SNUBaseballImage, SNUBaseballVideo
from apps.media.assets.utils import get_existing_file_type, get_file_type
from tests.factories import (
    SNUBaseballAssetFactory,
    SNUBaseballImageFactory,
    SNUBaseballVideoFactory,
    StoredFileFactory,
)


pytestmark = pytest.mark.django_db


def test_get_file_type():
    assert get_file_type("image/png") == "IMAGE"
    assert get_file_type("image/jpeg; charset=utf-8") == "IMAGE"
    assert get_file_type("video/mp4") == "VIDEO"
    assert get_file_type("video/avi; something") == "VIDEO"
    assert get_file_type("application/pdf") == "ASSET"
    assert get_file_type("text/plain") == "ASSET"
    assert get_file_type(None) == "ASSET"
    assert get_file_type("") == "ASSET"
    assert get_file_type("   ") == "ASSET"


def test_get_existing_file_type():
    # 새 키
    assert get_existing_file_type("nonexistent-key") is None

    # 이미지
    img = SNUBaseballImageFactory()
    assert get_existing_file_type(img.file.key) == "IMAGE"

    # 비디오
    vid = SNUBaseballVideoFactory()
    assert get_existing_file_type(vid.file.key) == "VIDEO"

    # 기타
    ast = SNUBaseballAssetFactory()
    assert get_existing_file_type(ast.file.key) == "ASSET"


def test_get_existing_file_type_multiple_types_raise():
    # 불변성 붕괴: 같은 파일에 복수 타입 연결
    file = StoredFileFactory()

    SNUBaseballImage(file=file).save()
    SNUBaseballVideo(file=file).save()

    with pytest.raises(Exception) as e:
        get_existing_file_type(file.key)
    assert "동일 파일에 중복 유형이 연결되어 있습니다." in str(e.value)


def test_get_existing_file_type_no_type_raise():
    # 불변성 붕괴: 어떤 타입에도 속하지 않는 파일
    file = StoredFileFactory()

    with pytest.raises(Exception) as e:
        get_existing_file_type(file.key)
    assert "Asset의 유형을 확인할 수 없습니다." in str(e.value)
