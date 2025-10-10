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

# CORS Origins
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    f"http://{config('TAILSCALE_IP')}:5173",
]

## Media upload max size
MEDIA_UPLOAD_MAX_SIZE = 10 * 1024 * 1024
