import posixpath
from django.conf import settings

from core.error_handling import SNUBaseballException


def verify_key(key: str) -> None:
    """
    키 접두사가 허용된 접두사 목록에 포함되는지 확인
    허용되지 않은 경우, 예외를 발생시킨다.
    """
    whitelist = getattr(settings, "MEDIA_KEY_PREFIX_WHITELIST", [])

    prefix = posixpath.normpath(key).lstrip("/")
    wl = [posixpath.normpath(p).lstrip("/") for p in whitelist]

    if not any(prefix.startswith(p) for p in wl):
        raise SNUBaseballException("허용되지 않은 키 접두사입니다.")


def verify_mimetype(content_type: str | None) -> None:
    """
    MIME 타입이 허용된 목록에 포함되는지 확인
    허용되지 않은 경우, 예외를 발생시킨다.
    """
    if content_type and any(
        content_type.startswith(p) for p in settings.MEDIA_ALLOWED_MIME_PREFIXES
    ):
        return
    if content_type in settings.MEDIA_ALLOWED_MIME_TYPES:
        return

    raise SNUBaseballException("허용되지 않은 MIME 타입입니다.")


def verify_file_size(size: int) -> int:
    """
    파일 크기가 허용된 범위 내에 있는지 확인
    허용되지 않은 경우, 예외를 발생시킨다.
    반환 값: 최대 허용 크기
    """
    MAX_SIZE = getattr(
        settings, "MEDIA_UPLOAD_MAX_SIZE", 10 * 1024 * 1024
    )  # 기본은 10MB
    if size <= 0 or size > MAX_SIZE:
        raise SNUBaseballException("허용되지 않은 파일 크기입니다.")

    return MAX_SIZE
