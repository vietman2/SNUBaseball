from django.http import Http404
from rest_framework.exceptions import APIException, PermissionDenied, ValidationError
from rest_framework.test import APIRequestFactory
from rest_framework_simplejwt.exceptions import InvalidToken

from core.error_handling import (
    SNUBaseballException,
    InvalidRefreshTokenException,
    baseball_server_exception_handler,
)

request_factory = APIRequestFactory()


def test_custom_exception_handling():
    exc = SNUBaseballException()
    context = {"request": request_factory.get("/some-url/")}

    response = baseball_server_exception_handler(exc, context)

    assert response is not None
    assert response.status_code == 400
    assert response.data["status"] == "ERROR"
    assert response.data["code"] == "UNKNOWN_ERROR"
    assert response.data["message"] == "서버에서 알 수 없는 오류가 발생했습니다."


def test_invalid_refresh_token_exception_handling():
    exc = InvalidRefreshTokenException()
    context = {"request": request_factory.get("/some-url/")}

    response = baseball_server_exception_handler(exc, context)

    assert response is not None
    assert response.status_code == 401
    assert response.data["status"] == "UNAUTHORIZED"
    assert response.data["code"] == "INVALID_REFRESH_TOKEN"
    assert response.data["message"] == "리프레시 토큰이 유효하지 않습니다."


def test_invalid_token_exception_handling():
    exc = InvalidToken()
    context = {"request": request_factory.get("/some-url/")}

    response = baseball_server_exception_handler(exc, context)

    assert response is not None
    assert response.status_code == 401
    assert response.data["status"] == "UNAUTHORIZED"
    assert response.data["code"] == "INVALID_TOKEN"
    assert response.data["message"] == "토큰이 유효하지 않습니다."


def test_permission_denied_exception_handling():
    exc = PermissionDenied()
    context = {"request": request_factory.get("/some-url/")}

    response = baseball_server_exception_handler(exc, context)

    assert response is not None
    assert response.status_code == 403
    assert response.data["status"] == "UNAUTHORIZED"
    assert response.data["code"] == "UNAUTHORIZED"


def test_http404_exception_handling():
    exc = Http404()
    context = {"request": request_factory.get("/some-url/")}

    response = baseball_server_exception_handler(exc, context)

    assert response is not None
    assert response.status_code == 404
    assert response.data["status"] == "NOT_FOUND"
    assert response.data["code"] == "NOT_FOUND"
    assert response.data["message"] == "요청한 리소스를 찾을 수 없습니다."


def test_validation_error_exception_handling():
    exc = ValidationError("Invalid input")
    context = {"request": request_factory.get("/some-url/")}

    response = baseball_server_exception_handler(exc, context)

    assert response is not None
    assert response.status_code == 400
    assert response.data["status"] == "ERROR"
    assert response.data["code"] == "VALIDATION_ERROR"


def test_unknown_exception_handling():
    exc = APIException("Some other error")
    context = {"request": request_factory.get("/some-url/")}

    response = baseball_server_exception_handler(exc, context)

    assert response.status_code == 500


def test_non_custom_exception_handling():
    exc = Exception("Some other error")
    context = {"request": request_factory.get("/some-url/")}

    response = baseball_server_exception_handler(exc, context)

    assert response is None
