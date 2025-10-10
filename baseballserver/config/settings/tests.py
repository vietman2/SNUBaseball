from .base import *  # pylint: disable=W0401,W0614

DEBUG = True

ALLOWED_HOSTS = []

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# CORS
CORS_ALLOWED_ORIGINS = []
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = []

MEDIA_CDN_BASE_URL = ""
MEDIA_KEY_PREFIX_WHITELIST = ["tests/", "gallery/"]
MEDIA_ALLOWED_MIME_PREFIXES = ["image/", "video/"]
MEDIA_ALLOWED_MIME_TYPES = ["application/pdf"]
MEDIA_UPLOAD_MAX_SIZE = 5 * 1024 * 1024  # 5

AWS_REGION = "region-name"
AWS_S3_BUCKET_NAME = "bucket-name"
AWS_ACCESS_KEY_ID = "access-key-id"
AWS_SECRET_ACCESS_KEY = "secret-access-key"
