import pytest

from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.db.models.query import QuerySet

from apps.media.assets.models import (
    SNUBaseballAsset,
    SNUBaseballImage,
    SNUBaseballVideo,
)
from apps.media.storage.models import StoredFile
from tests.factories import SNUBaseballAssetFactory, StoredFileFactory, UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture(name="mock_storedfile_integrity_error")
def _mock_storedfile_integrity_error(monkeypatch):
    ## integrity error를 강제하려면
    ## 먼저, get을 했을 때, DoesNotExist가 발생해야하고,
    ## 그 다음, create을 했을 때, IntegrityError가 발생해야 함
    ## 단, IntegrityError 발생 후, 다시 get을 했을 때는 정상적으로 객체가 존재해야 함

    def _apply(*, key: str) -> StoredFile:
        # 두 번째 get에서 반환할 실제 객체를 미리 만들어 둔다.
        sf = StoredFileFactory(key=key)

        state = {"first_get": True}

        def mocked_get(*args, **kwargs):
            # 첫 호출만 DoesNotExist
            if state["first_get"]:
                state["first_get"] = False
                raise StoredFile.DoesNotExist()
            # 이후 호출은 실제로 존재하는 sf 반환
            # (키 인자를 무시하지 않고 체크해도 됨. 필요 시 아래처럼 안전장치)
            if "key" in kwargs and kwargs["key"] != sf.key:
                # 원래 동작과 최대한 비슷하게: 다른 키면 실제 쿼리로 위임
                return StoredFile._default_manager.get(*args, **kwargs)
            return sf

        def mocked_create(*args, **kwargs):
            # create 단계에서 항상 무결성 충돌을 유발
            raise IntegrityError("simulated race")

        # Manager 인스턴스에 바인딩된 메서드를 패치
        monkeypatch.setattr(StoredFile.objects, "get", mocked_get)
        monkeypatch.setattr(StoredFile.objects, "create", mocked_create)
        return sf

    return _apply


def test_file_manager_unallowed_methods():
    with pytest.raises(NotImplementedError):
        SNUBaseballAsset.objects.create()
    with pytest.raises(NotImplementedError):
        SNUBaseballAsset.objects.update()
    with pytest.raises(NotImplementedError):
        SNUBaseballAsset.objects.get_or_create()
    with pytest.raises(NotImplementedError):
        SNUBaseballAsset.objects.update_or_create()


def test_assets_manager_update_or_create_by_key():
    ### 생성과 수정 둘 다 정상 동작하는지 (성공 케이스)
    asset, created = SNUBaseballAsset.objects.update_or_create_by_key(
        key="test_asset_key",
        original_filename="test_asset.pdf",
        mime="application/pdf",
        size=2048,
    )
    assert created is True
    assert asset.file.key == "test_asset_key"
    assert asset.file.original_filename == "test_asset.pdf"
    assert asset.file.mime == "application/pdf"
    assert asset.file.size == 2048

    # Update the existing asset
    asset, created = SNUBaseballAsset.objects.update_or_create_by_key(
        key="test_asset_key",
        original_filename="updated_asset.pdf",
        mime="application/pdf",
        size=4096,
    )
    assert created is False
    assert asset.file.key == "test_asset_key"
    assert asset.file.original_filename == "updated_asset.pdf"
    assert asset.file.mime == "application/pdf"
    assert asset.file.size == 4096


def test_asset_manager_update_nothing():
    ### 변경내용 없이 업데이트 시도
    # 최초 생성
    _, created = SNUBaseballAsset.objects.update_or_create_by_key(
        key="asset/nochange.bin",
        mime="application/octet-stream",
        size=7,
        original_filename="x.bin",
    )
    assert created is True
    # 변경 없이 동일 key로 호출 → 업데이트 없음 분기(메타 동일)
    a2, created2 = SNUBaseballAsset.objects.update_or_create_by_key(
        key="asset/nochange.bin"
    )
    assert created2 is False
    assert a2.file.original_filename == "x.bin"
    assert a2.file.size == 7
    assert a2.file.mime == "application/octet-stream"


def test_assets_manager_update_or_create_by_key_missing_key():
    with pytest.raises(ValidationError) as excinfo:
        SNUBaseballAsset.objects.update_or_create_by_key(
            key=None,
            original_filename="no_key_asset.pdf",
            mime="application/pdf",
            size=1024,
        )
    assert str(excinfo.value) == "['Key는 필수입니다.']"


def test_assets_manager_update_or_create_by_key_unallowed_mimetypes():
    with pytest.raises(ValidationError) as excinfo:
        SNUBaseballAsset.objects.update_or_create_by_key(
            key="image_with_video_mime",
            original_filename="image.jpg",
            mime="video/mp4",
            size=2048,
        )
    assert str(excinfo.value) == "['허용되지 않는 MIME 타입입니다: video/mp4']"

    with pytest.raises(ValidationError) as excinfo:
        SNUBaseballAsset.objects.update_or_create_by_key(
            key="video_with_image_mime",
            original_filename="video.mp4",
            mime="image/jpeg",
            size=4096,
        )
    assert str(excinfo.value) == "['허용되지 않는 MIME 타입입니다: image/jpeg']"

    with pytest.raises(ValidationError) as excinfo:
        SNUBaseballImage.objects.update_or_create_by_key(
            key="image_with_video_mime",
            original_filename="image.jpg",
            mime="video/mp4",
            size=2048,
        )
    assert str(excinfo.value) == "['허용되지 않는 MIME 타입입니다: video/mp4']"

    with pytest.raises(ValidationError) as excinfo:
        SNUBaseballVideo.objects.update_or_create_by_key(
            key="video_with_image_mime",
            original_filename="video.mp4",
            mime="image/jpeg",
            size=4096,
        )
    assert str(excinfo.value) == "['허용되지 않는 MIME 타입입니다: image/jpeg']"


def test_image_manager_success():
    img, created = SNUBaseballImage.objects.update_or_create_by_key(
        key="img/ok.png", mime="image/png", size=10
    )
    assert created is True
    assert img.file.key == "img/ok.png"
    assert img.file.mime.startswith("image/")


def test_video_manager_success():
    vid, created = SNUBaseballVideo.objects.update_or_create_by_key(
        key="vid/ok.mp4", mime="video/mp4", size=100
    )
    assert created is True
    assert vid.file.key == "vid/ok.mp4"
    assert vid.file.mime.startswith("video/")


def test_uploaded_by_is_set_only_on_create():
    # 생성 시 uploaded_by 세팅, 업데이트 시에는 변경되지 않아야 함
    u1 = UserFactory.create_normal_account()
    u2 = UserFactory.create_normal_account()

    a, created = SNUBaseballAsset.objects.update_or_create_by_key(
        key="asset/owner.bin",
        mime="application/octet-stream",
        size=3,
        uploaded_by=u1,
    )
    assert created is True
    assert a.uploaded_by_id == u1.pk

    # 동일 key 업데이트 시 uploaded_by=u2로 전달해도 바뀌지 않아야 함
    a2, created2 = SNUBaseballAsset.objects.update_or_create_by_key(
        key="asset/owner.bin",
        mime="application/octet-stream",
        size=5,
        uploaded_by=u2,
    )
    assert created2 is False
    assert a2.uploaded_by_id == u1.pk  # 여전히 u1


def test_update_or_create_stored_file_race(mock_storedfile_integrity_error):
    sf = mock_storedfile_integrity_error(key="race/storedfile.bin")

    ## update_fields가 있는 경우
    obj, created = SNUBaseballAsset.objects.update_or_create_by_key(
        key=sf.key,
        mime="application/octet-stream",
        size=42,
    )
    # create 중 IntegrityError → except에서 get으로 회복 → storedfile은 존재하고 asset은 새로 생성
    assert obj.file.key == "race/storedfile.bin"
    # Asset은 새로 생겼으므로 created=True
    assert created is True


def test_update_or_create_stored_file_race_nothing_to_update(
    mock_storedfile_integrity_error,
):
    sf = mock_storedfile_integrity_error(key="race/storedfile.bin")

    ## update_fields가 없는 경우
    obj, _ = SNUBaseballAsset.objects.update_or_create_by_key(key=sf.key)

    # create 중 IntegrityError → except에서 get으로 회복 → storedfile, asset 모두 존재
    assert obj.file.key == "race/storedfile.bin"


def test_update_or_create_asset_race(monkeypatch):
    ## StoredFile은 정상적으로 생성되고 나서,
    ## Asset 생성 단계에서 무결성 충돌이 발생하는 상황을 시뮬레이션
    ## QuerySet.create에서 IntegrityError가 발생하며,
    ## QuerySet.get은 오브젝트를 반환해야 한다.
    test_key = "race/storedfile.bin"
    file = StoredFileFactory(key=test_key)
    asset = SNUBaseballAssetFactory(file=file)

    def mock_create_stored_file(*args, **kwargs):
        return file, True

    def mock_create(*args, **kwargs):
        raise IntegrityError("simulated IntegrityError")

    def mock_get(*args, **kwargs):
        return asset

    monkeypatch.setattr(
        SNUBaseballAsset.objects,
        "_update_or_create_stored_file",
        mock_create_stored_file,
    )
    monkeypatch.setattr(QuerySet, "get", mock_get)
    monkeypatch.setattr(QuerySet, "create", mock_create)

    obj, created = SNUBaseballAsset.objects.update_or_create_by_key(
        key=test_key,
        mime="application/octet-stream",
        size=99,
    )

    assert obj.file.key
    assert created is True


def test_update_or_create_asset_race_2(monkeypatch):
    ## StoredFile은 이미 존재하는 상황에서,
    ## Asset은 get 했을 때, DoesNotExist가 발생하고,
    ## create 단계에서 무결성 충돌이 발생하는 상황을 시뮬레이션
    test_key = "race/storedfile.bin"
    file = StoredFileFactory(key=test_key)
    asset = SNUBaseballAssetFactory(file=file)

    def mock_create_stored_file(*args, **kwargs):
        return file, False

    def mock_get(*args, **kwargs):
        ## 첫 호출만 DoesNotExist
        if not hasattr(mock_get, "called"):
            mock_get.called = True
            raise SNUBaseballAsset.DoesNotExist()
        return asset

    def mock_create(*args, **kwargs):
        raise IntegrityError("simulated IntegrityError")

    monkeypatch.setattr(
        SNUBaseballAsset.objects,
        "_update_or_create_stored_file",
        mock_create_stored_file,
    )
    monkeypatch.setattr(QuerySet, "get", mock_get)
    monkeypatch.setattr(QuerySet, "create", mock_create)

    obj, created = SNUBaseballAsset.objects.update_or_create_by_key(
        key=test_key,
        mime="application/octet-stream",
        size=99,
    )

    assert obj.file.key
    assert created is True


## VideoManager의 update_thumbnail 메서드는 test_tasks.py 에서 테스트한다.
