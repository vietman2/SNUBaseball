from .base import *  # pylint: disable=W0401,W0614

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["localhost", "100.115.156.7"]

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# CORS
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    f"http://{config('TAILSCALE_IP')}:5173",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    "accept",
    "authorization",
    "content-type",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
    "x-snubaseball-client",
]

MEDIA_CDN_BASE_URL = config("MEDIA_CDN_BASE_URL")
MEDIA_KEY_PREFIX_WHITELIST = [
    "profiles/",
]
MEDIA_ALLOWED_MIME_PREFIXES = [
    "image/",
    "video/",
]
MEDIA_ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/msword",  # .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  # .docx
    "application/vnd.ms-excel",  # .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",  # .xlsx
    "application/vnd.ms-powerpoint",  # .ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",  # .pptx
    "application/x-hwp",  # .hwp (old)
    "application/vnd.hancom.hwp",  # .hwp
    "application/vnd.hancom.hwpx",  # .hwpx
    "application/x-hwpml",  # .hwpml (old)
    "application/vnd.hancom.hwpml",  # .hwpml (new)
    "application/zip",
    "application/x-7z-compressed",
    "application/x-rar-compressed",
    "application/gzip",
]
MEDIA_UPLOAD_MAX_SIZE = 10 * 1024 * 1024

AWS_REGION = "ap-northeast-2"
AWS_S3_BUCKET_NAME = config("AWS_S3_BUCKET_NAME")
AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
