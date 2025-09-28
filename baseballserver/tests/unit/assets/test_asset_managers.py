import types
from datetime import timedelta
import pytest
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.utils import timezone as djtz

from apps.media.assets.models import (
    SNUBaseballAsset,
    SNUBaseballImage,
    SNUBaseballVideo,
)
from apps.media.storage.models import StoredFile
from tests.factories import UserFactory

pytestmark = pytest.mark.django_db


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


def test_image_manager_update_or_create_by_key_missing_key():
    with pytest.raises(ValidationError) as excinfo:
        SNUBaseballImage.objects.update_or_create_by_key(
            key=None,
            original_filename="no_key_image.jpg",
            mime="image/jpeg",
            size=2048,
        )
    assert str(excinfo.value) == "['Key는 필수입니다.']"


def test_image_manager_update_or_create_by_key_unallowed_mimetypes():
    with pytest.raises(ValidationError) as excinfo:
        SNUBaseballImage.objects.update_or_create_by_key(
            key="image_with_video_mime",
            original_filename="image.jpg",
            mime="video/mp4",
            size=2048,
        )
    assert str(excinfo.value) == "['허용되지 않는 MIME 타입입니다: video/mp4']"


def test_video_manager_update_or_create_by_key_missing_key():
    with pytest.raises(ValidationError) as excinfo:
        SNUBaseballVideo.objects.update_or_create_by_key(
            key=None,
            original_filename="no_key_video.mp4",
            mime="video/mp4",
            size=4096,
        )
    assert str(excinfo.value) == "['Key는 필수입니다.']"


def test_video_manager_update_or_create_by_key_unallowed_mimetypes():
    with pytest.raises(ValidationError) as excinfo:
        SNUBaseballVideo.objects.update_or_create_by_key(
            key="video_with_image_mime",
            original_filename="video.mp4",
            mime="image/jpeg",
            size=4096,
        )
    assert str(excinfo.value) == "['허용되지 않는 MIME 타입입니다: image/jpeg']"


def test_image_manager_success_and_update():
    # create
    img, created = SNUBaseballImage.objects.update_or_create_by_key(
        key="img/ok.png", mime="image/png", size=10
    )
    assert created is True
    assert img.file.key == "img/ok.png"
    assert img.file.mime.startswith("image/")

    # update (size만 변경)
    img2, created2 = SNUBaseballImage.objects.update_or_create_by_key(
        key="img/ok.png", mime="image/png", size=99
    )
    assert created2 is False
    assert img2.file.size == 99


def test_video_manager_success_and_update():
    # create
    vid, created = SNUBaseballVideo.objects.update_or_create_by_key(
        key="vid/ok.mp4", mime="video/mp4", size=100
    )
    assert created is True
    assert vid.file.key == "vid/ok.mp4"
    assert vid.file.mime.startswith("video/")

    # update
    vid2, created2 = SNUBaseballVideo.objects.update_or_create_by_key(
        key="vid/ok.mp4", mime="video/mp4", size=123
    )
    assert created2 is False
    assert vid2.file.size == 123


def test_asset_manager_when_storedfile_exists_but_asset_missing_creates_new():
    # StoredFile만 미리 존재
    f = StoredFile.objects.create(
        key="asset/preexist.pdf",
        original_filename="pre.pdf",
        mime="application/pdf",
        size=1,
    )
    # 같은 key로 Asset 생성 시도 → qs.get(file=f)에서 DoesNotExist → create 분기
    a, created = SNUBaseballAsset.objects.update_or_create_by_key(
        key=f.key, mime="application/pdf", size=2
    )
    assert created is True
    assert a.file_id == f.pk
    assert a.file.size == 2  # 업데이트 반영


def test_asset_manager_update_no_field_changes_does_not_modify_file_fields():
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


def test_assets_manager_rejects_mime_from_file_attr():
    # file 객체의 mime 속성을 통해서도 검증이 동작하는지(이미지/비디오 금지)
    dummy_file = types.SimpleNamespace(mime="image/png")
    with pytest.raises(ValidationError) as exc:
        SNUBaseballAsset.objects.update_or_create_by_key(
            key="x/deny.png", file=dummy_file, size=1
        )
    assert "허용되지 않는 MIME 타입입니다: image/png" in str(exc.value)

    dummy_file2 = types.SimpleNamespace(mime="video/mp4")
    with pytest.raises(ValidationError) as exc2:
        SNUBaseballAsset.objects.update_or_create_by_key(
            key="x/deny.mp4", file=dummy_file2, size=1
        )
    assert "허용되지 않는 MIME 타입입니다: video/mp4" in str(exc2.value)


def test_uploaded_by_is_set_only_on_create(monkeypatch):
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


def test_update_sets_updated_at_when_any_field_changes(monkeypatch):
    # updated_at이 BaseFileManager._update_fields 경유 시 갱신되는지
    # 1) 최초 생성
    img, created = SNUBaseballImage.objects.update_or_create_by_key(
        key="img/time.png", mime="image/png", size=10
    )
    assert created is True
    # 현재 값 캡처
    img.file.refresh_from_db()
    before = img.file.updated_at

    # 2) 시간 고정 후 업데이트
    fixed_now = djtz.now() + timedelta(hours=1)
    monkeypatch.setattr(djtz, "now", lambda: fixed_now)

    img2, created2 = SNUBaseballImage.objects.update_or_create_by_key(
        key="img/time.png", mime="image/png", size=11  # size만 변경
    )
    assert created2 is False
    img2.file.refresh_from_db()
    assert img2.file.size == 11
    # updated_at이 정확히 fixed_now로 갱신되었는지(모델에서 auto_now를 써도 동일 값)
    assert img2.file.updated_at >= fixed_now
    assert (img2.file.updated_at == fixed_now) or (img2.file.updated_at > before)


def test__update_or_create_stored_file_race_creating_storedfile(monkeypatch):
    """
    StoredFile가 없는 상태에서 .create() 시 다른 트랜잭션이 먼저(혹은 동시에) 생성한 것처럼
    create가 IntegrityError를 던지고, 이후 get(key=..)으로 회복하는 경로 커버.
    """
    real_create = StoredFile.objects.create

    def racing_create(*args, **kwargs):
        # 같은 key로 먼저 실제 생성해두고, 그 다음 IntegrityError를 던져
        # "다른 트랜잭션이 먼저 만들었다" 상황을 시뮬레이션
        key = kwargs.get("key")
        if not StoredFile.objects.filter(key=key).exists():
            real_create(*args, **kwargs)
        raise IntegrityError("simulated race")

    monkeypatch.setattr(StoredFile.objects, "create", racing_create)

    obj, created = SNUBaseballAsset.objects.update_or_create_by_key(
        key="race/storedfile.bin",
        mime="application/octet-stream",
        size=42,
    )
    # create 중 IntegrityError → except에서 get으로 회복 → storedfile은 존재하고 asset은 새로 생성
    assert obj.file.key == "race/storedfile.bin"
    # Asset은 새로 생겼으므로 created=True
    assert created is True


def test_asset_create_race_on_asset_creation(monkeypatch):
    """
    StoredFile은 존재하지만 Asset이 없는 상태에서, Asset을 create하는 순간
    다른 트랜잭션이 먼저 만들어서 IntegrityError가 나는 분기 커버.
    """
    # Given: StoredFile만 존재
    f = StoredFile.objects.create(
        key="asset/race.bin",
        original_filename="x.bin",
        mime="application/octet-stream",
        size=1,
    )

    real_asset_create = SNUBaseballAsset.objects.create

    def racing_asset_create(*args, **kwargs):
        # 먼저 실제로 하나 만들고, 그 다음 IntegrityError 던져서
        # 매니저의 except IntegrityError → get(file=...) 분기로 들어가게 한다
        if not SNUBaseballAsset.objects.filter(file=f).exists():
            real_asset_create(*args, **kwargs)
        raise IntegrityError("simulated race on asset create")

    monkeypatch.setattr(SNUBaseballAsset.objects, "create", racing_asset_create)

    obj, created = SNUBaseballAsset.objects.update_or_create_by_key(
        key=f.key,
        mime="application/octet-stream",
        size=99,  # 업데이트도 반영됨
    )
    # IntegrityError 발생 후 get으로 회복했으므로 created=True로 반환하도록 구현되어 있음
    assert created is True
    assert obj.file_id == f.id
    assert obj.file.size == 99  # 업데이트 반영 확인
