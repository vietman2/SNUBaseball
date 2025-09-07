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

AWS_REGION = "ap-northeast-2"
AWS_S3_BUCKET_NAME = config("AWS_S3_BUCKET_NAME")
AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
