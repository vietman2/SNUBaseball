# apps/media/api.py
from typing import TYPE_CHECKING, Dict

__all__ = (
    "presign_upload",
    "complete_upload",
    "SNUBaseballAsset",
    "SNUBaseballImage",
    "SNUBaseballVideo",
)

if TYPE_CHECKING:
    from .models import SNUBaseballAsset, SNUBaseballImage, SNUBaseballVideo


def presign_upload(
    *, prefix: str, filename: str, content_type: str | None, size: int
) -> Dict:
    """
    업로드 전 사전 검증 + S3 presigned POST 발급.
    - MIME 허용 목록 확인
    - 동일 key 존재 시 타입 전환 금지 확인
    """
    from .services import presign_upload as _impl

    return _impl(prefix=prefix, filename=filename, content_type=content_type, size=size)


def complete_upload(
    *, key: str, original_filename: str | None, uploaded_by
) -> "SNUBaseballAsset | SNUBaseballImage | SNUBaseballVideo":
    """
    S3 업로드 완료 후 최종 검증 + DB upsert.
    - HEAD로 size/Content-Type 확인
    - MIME 허용 목록 재확인 (얇은 안전망)
    """
    from .services import complete_upload as _impl

    return _impl(key=key, original_filename=original_filename, uploaded_by=uploaded_by)


# Lazy re-exports for models (avoid import-time side effects / cycles)
def __getattr__(name: str):
    if name == "SNUBaseballAsset":
        from .models.asset import SNUBaseballAsset

        return SNUBaseballAsset
    if name == "SNUBaseballImage":
        from .models.image import SNUBaseballImage

        return SNUBaseballImage
    if name == "SNUBaseballVideo":
        from .models.video import SNUBaseballVideo

        return SNUBaseballVideo
    raise AttributeError(f"media.api has no attribute {name!r}")
