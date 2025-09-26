import mimetypes

from apps.media.storage.api import presign_post
from core.error_handling import SNUBaseballException
from ..utils import get_file_type, get_existing_file_type


def presign_upload(key: str, content_type: str | None, size: int) -> dict:
    """
    서비스에 파일을 업로드하기 위한 URL과 폼 데이터를 발급합니다.
    반환 형태:
    {
        "url": string,
        "fields": records<string, string>
          - POST 요청에 반드시 포함되어야 하는 필드들
    }
    - 예외:
        - 기존에 존재하는 키에 대해 타입 전환 시도
        - 키 생성 실패 (storage에서 처리)
        - 허용되지 않은 MIME 타입 (storage에서 처리)
        - 허용되지 않은 파일 크기 (storage에서 처리)
    """
    ## 1. 기존에 존재하는 키라면, 같은 타입인지 확인 (해당 함수에서 타입이 다르면 예외 발생)
    ct = (
        content_type or mimetypes.guess_type(key)[0] or "application/octet-stream"
    ).lower()
    ct = ct.split(";", 1)[0].strip()  # "text/plain; charset=utf-8" 같은 경우 처리

    new_type = get_file_type(ct)
    existing_type = get_existing_file_type(key)

    if existing_type is not None and existing_type != new_type:
        raise SNUBaseballException("파일 유형이 일치하지 않습니다.")

    ## 2. presign POST 발급
    return presign_post(key, ct, size)
