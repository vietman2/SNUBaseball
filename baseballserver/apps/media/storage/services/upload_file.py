from django.conf import settings

from .client import get_client


def upload_file(key: str, file_data: bytes, content_type: str) -> None:
    """
    S3에 파일 업로드
    - 예외:
        - 업로드 실패 (네트워크 문제, 권한 문제 등)
    """
    bucket_name = settings.AWS_S3_BUCKET_NAME

    result = get_client().put_object(
        Bucket=bucket_name,
        Key=key,
        Body=file_data,
        ContentType=content_type,
        ACL="private",
        CacheControl="public, max-age=31536000",
    )

    return result
