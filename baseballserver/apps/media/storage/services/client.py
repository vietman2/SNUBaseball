import boto3
from botocore.config import Config

from django.conf import settings


def get_client():
    """
    S3 클라이언트 생성
    """
    retries = getattr(
        settings,
        "AWS_S3_CLIENT_RETRIES",
        {
            "max_attempts": 3,
            "mode": "standard",
        },
    )
    connect_timeout = getattr(settings, "AWS_S3_CLIENT_CONNECT_TIMEOUT", 3)
    read_timeout = getattr(settings, "AWS_S3_CLIENT_READ_TIMEOUT", 5)

    config = Config(
        retries=retries,
        connect_timeout=connect_timeout,
        read_timeout=read_timeout,
        signature_version="s3v4",
    )

    region = settings.AWS_REGION
    access_key = settings.AWS_ACCESS_KEY_ID
    secret_key = settings.AWS_SECRET_ACCESS_KEY

    return boto3.client(
        "s3",
        region_name=region,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        config=config,
    )
