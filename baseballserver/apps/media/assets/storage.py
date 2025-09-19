import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
from django.conf import settings

from core.error_handling import SNUBaseballException


def _client():
    region = settings.AWS_REGION
    access_key = settings.AWS_ACCESS_KEY_ID
    secret_key = settings.AWS_SECRET_ACCESS_KEY

    s3_client = boto3.client(
        "s3",
        region_name=region,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        config=Config(retries={"max_attempts": 3, "mode": "standard"}),
    )
    return s3_client


def verify_head(key: str) -> dict:
    """업로드 완료 후 HEAD로 가볍게 검증."""
    try:
        c = _client()
        h = c.head_object(Bucket=settings.AWS_S3_BUCKET_NAME, Key=key)
    except ClientError as e:
        code = e.response.get("Error", {}).get("Code")
        if code in {"404", "NoSuchKey", "NotFound"}:
            raise SNUBaseballException("업로드된 파일을 찾을 수 없습니다.")
        raise SNUBaseballException("파일 정보를 가져오는 데 실패했습니다.") from e

    return {
        "size": h["ContentLength"],
        "content_type": h.get("ContentType"),
        "etag": h.get("ETag"),
    }


def presign_post(key: str, content_type: str, size: int) -> dict:
    max_size = getattr(
        settings, "MEDIA_UPLOAD_MAX_SIZE", 10 * 1024 * 1024
    )  # 기본은 10MB
    if size <= 0 or size > max_size:
        raise SNUBaseballException("허용되지 않은 파일 크기입니다.")

    fields = {"Content-Type": content_type, "success_action_status": "201"}
    conditions = [
        {"Content-Type": content_type},
        {"success_action_status": "201"},
        ["content-length-range", 1, max_size],
        {"key": key},
    ]

    bucket_name = settings.AWS_S3_BUCKET_NAME

    result = _client().generate_presigned_post(
        bucket_name,
        key,
        Fields=fields,
        Conditions=conditions,
        ExpiresIn=3600,
    )

    return result
