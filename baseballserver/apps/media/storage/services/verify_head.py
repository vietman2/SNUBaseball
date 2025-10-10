import mimetypes
from botocore.exceptions import ClientError
from django.conf import settings

from core.error_handling import SNUBaseballException
from .client import get_client
from ..utils import verify_mimetype


def verify_head(key: str) -> dict:
    """
    업로드 완료 후 HEAD로 가볍게 검증.
    size, content_type, etag를 반환.
    - 404/NoSuchKey/NotFound: 파일 없음
    - 403/AccessDenied: 권한 문제
    - 그 외: 알 수 없는 문제
    """

    try:
        c = get_client()
        h = c.head_object(Bucket=settings.AWS_S3_BUCKET_NAME, Key=key)
    except ClientError as e:
        status = (e.response or {}).get("ResponseMetadata", {}).get("HTTPStatusCode")
        code = (e.response or {}).get("Error", {}).get("Code")

        if code in {"404", "NoSuchKey", "NotFound"} or status == 404:
            raise SNUBaseballException("업로드된 파일을 찾을 수 없습니다.") from e

        if code in {"403", "AccessDenied"} or status == 403:
            raise SNUBaseballException("파일에 접근할 권한이 없습니다.") from e

        raise SNUBaseballException("파일 정보를 가져오는 데 실패했습니다.") from e

    etag = h.get("ETag")
    if isinstance(etag, str):
        etag = etag.strip('"')

    reported = h.get("ContentType")
    inferred = mimetypes.guess_type(key)[0]
    mime = reported or inferred or "application/octet-stream"
    verify_mimetype(mime)

    return {
        "size": h["ContentLength"],
        "content_type": mime,
        "etag": etag,
    }
