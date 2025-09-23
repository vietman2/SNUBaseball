import mimetypes
import posixpath
from django.conf import settings

from core.error_handling import SNUBaseballException
from .models import SNUBaseballAsset, SNUBaseballImage, SNUBaseballVideo
from .storage import presign_post, verify_head


def _check_prefix(prefix: str):
    whitelist = getattr(settings, "MEDIA_KEY_PREFIX_WHITELIST", [])

    if not any(prefix.startswith(p) for p in whitelist):
        raise SNUBaseballException("허용되지 않은 키 접두사입니다.")


def _is_allowed_mime_type(ct: str | None) -> bool:
    if ct and any(ct.startswith(p) for p in settings.MEDIA_ALLOWED_MIME_PREFIXES):
        return True
    if ct in settings.MEDIA_ALLOWED_MIME_TYPES:
        return True

    return False


def _build_key(prefix: str, filename: str) -> str:
    _check_prefix(prefix)
    safe = filename.strip().replace(" ", "_")[:100]

    return posixpath.join(prefix, safe)


def presign_upload(
    prefix: str, filename: str, content_type: str | None, size: int
) -> dict:
    key = _build_key(prefix, filename)
    ct = content_type or mimetypes.guess_type(key)[0] or "application/octet-stream"
    if not _is_allowed_mime_type(ct):
        raise SNUBaseballException("허용되지 않은 MIME 타입입니다.")

    ## ------ 타입 전환 방지 ------ ##
    existing_id = (
        SNUBaseballAsset.objects.filter(key=key).values_list("id", flat=True).first()
    )
    if existing_id is not None:
        if SNUBaseballImage.objects.filter(id=existing_id).exists():
            old_kind = "image"
        elif SNUBaseballVideo.objects.filter(id=existing_id).exists():
            old_kind = "video"
        else:
            old_kind = "file"

        if ct.startswith("image/"):
            new_kind = "image"
        elif ct.startswith("video/"):
            new_kind = "video"
        else:
            new_kind = "file"

        if old_kind != new_kind:
            raise SNUBaseballException("파일 유형이 일치하지 않습니다.")

    return presign_post(key, ct, size)


def complete_upload(key: str, original_filename: str | None, uploaded_by):
    h = verify_head(key)

    mime = (
        h.get("content_type")
        or mimetypes.guess_type(key)[0]
        or "application/octet-stream"
    )

    if not _is_allowed_mime_type(mime):
        raise SNUBaseballException("허용되지 않은 MIME 타입입니다.")

    common_fields = {
        "original_filename": (original_filename or "")[:100],
        "mime": mime,
        "size": h["size"],
        "uploaded_by": uploaded_by,
    }

    if mime.startswith("image/"):
        obj, _ = SNUBaseballImage.objects.update_or_create(
            key=key, defaults=common_fields
        )
    elif mime.startswith("video/"):
        obj, _ = SNUBaseballVideo.objects.update_or_create(
            key=key, defaults=common_fields
        )
    else:
        obj, _ = SNUBaseballAsset.objects.update_or_create(
            key=key, defaults=common_fields
        )

    return obj
