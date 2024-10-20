from .base import * # pylint: disable=W0401,W0614

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost']

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_KEY')
AWS_STORAGE_BUCKET_NAME = 'snubaseball.test'
AWS_S3_ENDPOINT_URL = 'https://kr.object.ncloudstorage.com'
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
MEDIA_URL = 'https://kr.object.ncloudstorage.com/snubaseball.test/'
FALLBACK_IMAGE = 'https://kr.object.ncloudstorage.com/snubaseball.test/profiles/person.png'

NAVER_CLIENT_ID = config("NAVER_API_KEY_ID")
NAVER_CLIENT_SECRET = config("NAVER_API_KEY")

# CORS
CORS_ALLOWED_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
