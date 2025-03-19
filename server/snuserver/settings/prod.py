from .base import * # pylint: disable=W0401,W0614

SECRET_KEY = config("SECRET_KEY")

DEBUG = False

ALLOWED_HOSTS = ['api.snubaseball.co.kr']

TEAM_PAGE_URL = 'https://team.snubaseball.co.kr'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'snubaseball',
        'USER': 'snubaseball',
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': '5432',
    }
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'gunicorn_error': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': '/app/logs/error.log',
            'formatter': 'verbose',
        },
        'gunicorn_access': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': '/app/logs/access.log',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'gunicorn.error': {
            'handlers': ['gunicorn_error'],
            'level': 'ERROR',
            'propagate': True,
        },
        'gunicorn.access': {
            'handlers': ['gunicorn_access'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

#CACHES = {
#    'default': {
#        'BACKEND': 'django_redis.cache.RedisCache',
#        'LOCATION': 'redis://127.0.0.1:6379/1',
#    }
#}

REST_AUTH = {
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'access',
    'JWT_AUTH_REFRESH_COOKIE': 'refresh',
    'JWT_AUTH_SECURE': True,
    'JWT_AUTH_SAMESITE': 'None',
    'JWT_AUTH_HTTPONLY': True,
    'JWT_AUTH_RETURN_EXPIRATION': True,
    'JWT_AUTH_COOKIE_USE_CSRF' : True,
    'SESSION_LOGIN': False,

    'USER_DETAILS_SERIALIZER': 'person.user.serializers.ProfileSerializer',
}

AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_KEY')
AWS_STORAGE_BUCKET_NAME = 'snubaseball'
AWS_S3_ENDPOINT_URL = 'https://kr.object.ncloudstorage.com'
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
MEDIA_URL = 'https://kr.object.ncloudstorage.com/snubaseball/'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
FALLBACK_IMAGE = 'https://kr.object.ncloudstorage.com/snubaseball/profiles/person.png'

CORS_ALLOWED_ORIGINS = [
    "https://snubaseball.co.kr",
    "https://www.snubaseball.co.kr",
    "https://team.snubaseball.co.kr",
    "https://api.snubaseball.co.kr",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    "content-type",
    "authorization",
    "x-csrftoken",
]
CSRF_TRUSTED_ORIGINS = [
    "https://api.snubaseball.co.kr",
    "https://snubaseball.co.kr",
    "https://www.snubaseball.co.kr",
    "https://team.snubaseball.co.kr",
]
CORS_PREFLIGHT_MAX_AGE = 3600

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = False
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
X_FRAME_OPTIONS = 'DENY'
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000  # 1 year in seconds
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

DATA_UPLOAD_MAX_MEMORY_SIZE = 1073741824  # 1GB
FILE_UPLOAD_MAX_MEMORY_SIZE = 1073741824  # 1GB
