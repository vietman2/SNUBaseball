from django.http import Http404
from rest_framework.exceptions import (
    AuthenticationFailed,
    NotAuthenticated,
    PermissionDenied,
    ValidationError,
)
from rest_framework.views import exception_handler
from rest_framework_simplejwt.exceptions import InvalidToken

from core.auth import delete_refresh_cookie
from .exceptions import SNUBaseballException, InvalidRefreshTokenException


def baseball_server_exception_handler(exc, context):
    """
    커스텀 예외 처리 함수
    """
    response = exception_handler(exc, context)

    if isinstance(exc, SNUBaseballException):
        response.data = {
            "status": exc.status,
            "code": exc.code,
            "message": exc.detail,
        }
        response.status_code = exc.status_code

        if isinstance(exc, InvalidRefreshTokenException):
            response = delete_refresh_cookie(response)

        return response

    if isinstance(exc, InvalidToken):
        response.data = {
            "status": "UNAUTHORIZED",
            "code": "INVALID_TOKEN",
            "message": "토큰이 유효하지 않습니다.",
        }

        return response

    if isinstance(exc, (NotAuthenticated, AuthenticationFailed, PermissionDenied)):
        response.data = {
            "status": "UNAUTHORIZED",
            "code": "UNAUTHORIZED",
            "message": str(exc.detail) or "인증되지 않은 사용자입니다.",
        }

        return response

    if isinstance(exc, Http404):
        response.data = {
            "status": "NOT_FOUND",
            "code": "NOT_FOUND",
            "message": "요청한 리소스를 찾을 수 없습니다.",
        }

        return response

    if isinstance(exc, ValidationError):
        response.data = {
            "status": "ERROR",
            "code": "VALIDATION_ERROR",
            "message": exc.detail,
        }

        return response

    if response is not None:
        response.data = {
            "status": "ERROR",
            "code": "UNKNOWN_ERROR",
            "message": response.data.get(
                "detail", "서버에서 알 수 없는 오류가 발생했습니다."
            ),
        }

    return response
