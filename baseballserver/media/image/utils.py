import mimetypes
from django.conf import settings

from core.storage import get_s3_client


def get_presigned_post(key: str, content_type: str, size: int) -> str | None:
    if not any(
        key.startswith(prefix) for prefix in settings.MEDIA_KEY_PREFIX_WHITELIST
    ):
        return None

    s3_client = get_s3_client()

    guessed = mimetypes.guess_type(key)[0]
    final_content_type = content_type or guessed or "application/octet-stream"

    max_size = 10 * 1024 * 1024  # 10 MB
    if size <= 0 or size > max_size:
        return None

    bucket_name = settings.AWS_S3_BUCKET_NAME

    result = s3_client.generate_presigned_post(
        bucket_name,
        key,
        Fields={"Content-Type": final_content_type},
        Conditions=[
            {"Content-Type": final_content_type},
            ["content-length-range", 1, max_size],
            {"key": key},
        ],
        ExpiresIn=3600,
    )

    return result


def get_image_url(key: str) -> str:
    return f"{settings.MEDIA_CDN_BASE_URL}/{key}"
