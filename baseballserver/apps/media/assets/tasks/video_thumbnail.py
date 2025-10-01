from __future__ import annotations
import posixpath
import subprocess
from tempfile import NamedTemporaryFile
from celery import shared_task
from django.core.exceptions import ValidationError

from apps.media.storage.api import upload_file
from core.error_handling import SNUBaseballException
from ..models import SNUBaseballVideo

_THUMB_MAX = 1024
_THUMB_QUALITY = 5


def _thumb_key(src_key: str) -> str:
    base, name = posixpath.split(src_key)
    stem = name.rsplit(".", 1)[0]
    # 포맷은 WEBP로 통일 (손쉬운 추출/호환성↑)
    return posixpath.join(base, f"{stem}@auto_{_THUMB_MAX}px.webp")


@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=True, max_retries=3)
def generate_video_thumbnail(self, key: str, video_url: str) -> str:
    """
    비디오 썸네일 생성 및 업로드
    - `key`: 비디오 파일의 스토리지 키
    - `at_sec`: 썸네일 추출 시점 (초 단위). None이면 자동 추출
    - 리턴값: 생성된 썸네일의 스토리지 키
    """

    tkey = _thumb_key(key)

    with NamedTemporaryFile(suffix=".webp") as tmp:
        output_path = tmp.name
        cmd = ["ffmpeg", "-hide_banner", "-loglevel", "error"]
        cmd += [
            "-i",
            video_url,
            "-frames:v",
            "1",
            "-vf",
            f"thumbnail,scale='min({_THUMB_MAX}, iw)': -2",
            "-vcodec",
            "libwebp",
            "-q:v",
            str(_THUMB_QUALITY),
            "-y",
            output_path,
        ]

        try:
            subprocess.check_call(cmd)

            with open(output_path, "rb") as f:
                data = f.read()
                upload_file(
                    key=tkey,
                    file_data=data,
                    content_type="image/webp",
                )
        except subprocess.CalledProcessError as e:
            raise SNUBaseballException(f"썸네일 생성에 실패했습니다: {key}") from e

    try:
        SNUBaseballVideo.objects.update_thumbnail(key=key, thumbnail_key=tkey)
    except ValidationError as e:
        raise SNUBaseballException(f"썸네일 저장에 실패했습니다: {str(e)}") from e

    return tkey
