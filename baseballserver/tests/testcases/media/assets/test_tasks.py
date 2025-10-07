import subprocess
import pytest
from django.core.exceptions import ObjectDoesNotExist

from apps.media.assets.tasks import generate_video_thumbnail
from core.error_handling import SNUBaseballException
from tests.factories import SNUBaseballVideoFactory

_MODULE_PATH = "apps.media.assets.tasks.video_thumbnail"


@pytest.fixture(autouse=True, name="check_call")
def _check_call_mock(mocker):
    def _ffmpeg_ok(cmd, *args, **kwargs):
        out_path = cmd[-1]
        with open(out_path, "wb") as f:
            f.write(b"WEBP")
        return 0

    return mocker.patch(f"{_MODULE_PATH}.subprocess.check_call", side_effect=_ffmpeg_ok)


@pytest.fixture(autouse=True, name="upload_mock")
def _upload_file_mock(mocker):
    return mocker.patch(f"{_MODULE_PATH}.upload_file", return_value=None)


@pytest.fixture(autouse=True, name="managers_mock")
def _managers_get_mock(mocker):
    obj = SNUBaseballVideoFactory(file__key="gallery/clip.mp4")
    mock_manager = mocker.patch("apps.media.assets.models.managers.VideosManager.get")
    storedfile_mock = mocker.patch(
        "apps.media.assets.models.managers.StoredFile.objects.get"
    )
    storedfile_mock.return_value = obj.file
    mock_manager.return_value = obj

    return storedfile_mock, mock_manager


@pytest.mark.django_db
def test_generate_video_thumbnail_success(upload_mock):
    ### Manager의 update_thumbnail 메서드는 mock 하지 않고, 실제로 돌린다.
    key = "gallery/clip.mp4"
    video_url = "https://cdn.test/gallery/clip.mp4"
    expected_tkey = "gallery/clip@auto_1024px.webp"

    # 동기 실행
    tkey = generate_video_thumbnail.run(key=key, video_url=video_url)

    assert tkey == expected_tkey
    upload_mock.assert_called_once()
    _, kwargs = upload_mock.call_args
    assert kwargs["key"] == expected_tkey
    assert kwargs["content_type"] == "image/webp"


@pytest.mark.django_db
def test_generate_video_thumbnail_fail_nokeyey():
    ### Manager의 update_thumbnail 메서드는 mock 하지 않고, 실제로 돌린다.
    key = ""  # 비정상 키
    video_url = "https://cdn.test/gallery/clip.mp4"

    with pytest.raises(SNUBaseballException) as e:
        # 동기 실행
        generate_video_thumbnail.run(key=key, video_url=video_url)

    assert str(e.value) == "썸네일 저장에 실패했습니다: ['Key는 필수입니다.']"


@pytest.mark.django_db
def test_generate_video_thumbnail_fail_nostoredfileobj(managers_mock):
    storedfile_manager_mock, _ = managers_mock
    storedfile_manager_mock.side_effect = ObjectDoesNotExist

    key = "gallery/clip.mp4"
    video_url = "https://cdn.test/gallery/clip.mp4"

    with pytest.raises(SNUBaseballException) as e:
        # 동기 실행
        generate_video_thumbnail.run(key=key, video_url=video_url)

    assert str(e.value) == "썸네일 저장에 실패했습니다: ['존재하지 않는 비디오입니다.']"


@pytest.mark.django_db
def test_generate_video_thumbnail_fail_ffmpegerror(check_call):
    check_call.side_effect = subprocess.CalledProcessError(1, "ffmpeg")

    key = "gallery/clip.mp4"
    video_url = "https://cdn.test/gallery/clip.mp4"

    with pytest.raises(SNUBaseballException) as e:
        # 동기 실행
        generate_video_thumbnail.run(key=key, video_url=video_url)

    assert "썸네일 생성에 실패했습니다" in str(e.value)
