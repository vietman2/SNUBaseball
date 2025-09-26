from __future__ import annotations

from django.conf import settings

from .client import get_client
from ..utils import verify_mimetype, verify_file_size, verify_key


def presign_post(key: str, content_type: str, size: int) -> dict:
    """
    S3에 업로드할 수 있는 presigned POST를 생성합니다.
    반환 값 형태:
    {
        "url": string,
        "fields": record of fields that must be provided as POST data
    }
    - 예외:
        - 허용되지 않은 키 접두사
        - 허용되지 않은 MIME 타입
        - 허용되지 않은 파일 크기
    """
    ## 1. 키 접두사, MIME 타입, 파일 크기 검증
    verify_key(key)
    verify_mimetype(content_type)
    MAX_SIZE = verify_file_size(size)

    fields = {"Content-Type": content_type, "success_action_status": "201"}
    conditions = [
        {"Content-Type": content_type},
        {"success_action_status": "201"},
        ["content-length-range", 1, MAX_SIZE],
        {"key": key},
    ]
    expires_in = int(getattr(settings, "MEDIA_PRESIGN_EXPIRES_IN", 3600))  # 기본 1시간

    bucket_name = settings.AWS_S3_BUCKET_NAME

    result = get_client().generate_presigned_post(
        bucket_name,
        key,
        Fields=fields,
        Conditions=conditions,
        ExpiresIn=expires_in,
    )

    return result


# ─────────────────────────────────────────────────────────────────────────────
# NOTE: 대용량/끊김 보완이 필요해지면 멀티파트 업로드 로드맵
# - create_multipart_upload → 각 파트에 대해 presigned URL 생성(UploadPart) → CompleteMultipartUpload
# - 실패 시 AbortMultipartUpload 필수
# - 재시도/부분 재개를 위해 파트 ETag 리스트를 서버에 임시 저장해 두는 설계가 일반적
# - 클라이언트는 5MB 이상 파트 권장, 병렬 업로드로 속도 개선 가능
# ─────────────────────────────────────────────────────────────────────────────
