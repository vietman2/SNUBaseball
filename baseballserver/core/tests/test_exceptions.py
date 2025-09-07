from django.http import Http404
from rest_framework.exceptions import APIException, PermissionDenied, ValidationError
from rest_framework.test import APIRequestFactory
from rest_framework_simplejwt.exceptions import InvalidToken

from core.test import SNUBaseballTestCase
from ..exceptions import (
    baseball_server_exception_handler,
    SNUBaseballException,
    InvalidRefreshTokenException,
)


class ExceptionHandlerTestCase(SNUBaseballTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_custom_exception_handling(self):
        exc = SNUBaseballException()
        context = {"request": self.factory.get("/some-url/")}

        response = baseball_server_exception_handler(exc, context)

        self.assertIsNotNone(response)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["status"], "ERROR")
        self.assertEqual(response.data["code"], "UNKNOWN_ERROR")
        self.assertEqual(
            response.data["message"], "서버에서 알 수 없는 오류가 발생했습니다."
        )

    def test_invalid_refresh_token_exception_handling(self):
        exc = InvalidRefreshTokenException()
        context = {"request": self.factory.get("/some-url/")}

        response = baseball_server_exception_handler(exc, context)

        self.assertIsNotNone(response)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data["status"], "UNAUTHORIZED")
        self.assertEqual(response.data["code"], "INVALID_REFRESH_TOKEN")
        self.assertEqual(response.data["message"], "리프레시 토큰이 유효하지 않습니다.")

    def test_invalid_token_exception_handling(self):
        exc = InvalidToken()
        context = {"request": self.factory.get("/some-url/")}

        response = baseball_server_exception_handler(exc, context)

        self.assertIsNotNone(response)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.data["status"], "UNAUTHORIZED")
        self.assertEqual(response.data["code"], "INVALID_TOKEN")
        self.assertEqual(response.data["message"], "토큰이 유효하지 않습니다.")

    def test_permission_denied_exception_handling(self):
        exc = PermissionDenied()
        context = {"request": self.factory.get("/some-url/")}

        response = baseball_server_exception_handler(exc, context)

        self.assertIsNotNone(response)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data["status"], "UNAUTHORIZED")
        self.assertEqual(response.data["code"], "UNAUTHORIZED")

    def test_http404_exception_handling(self):
        exc = Http404()
        context = {"request": self.factory.get("/some-url/")}

        response = baseball_server_exception_handler(exc, context)

        self.assertIsNotNone(response)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data["status"], "NOT_FOUND")
        self.assertEqual(response.data["code"], "NOT_FOUND")
        self.assertEqual(response.data["message"], "요청한 리소스를 찾을 수 없습니다.")

    def test_validation_error_exception_handling(self):
        exc = ValidationError("Invalid input")
        context = {"request": self.factory.get("/some-url/")}

        response = baseball_server_exception_handler(exc, context)

        self.assertIsNotNone(response)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["status"], "ERROR")
        self.assertEqual(response.data["code"], "VALIDATION_ERROR")

    def test_unknown_exception_handling(self):
        exc = APIException("Some other error")
        context = {"request": self.factory.get("/some-url/")}

        response = baseball_server_exception_handler(exc, context)

        self.assertEqual(response.status_code, 500)

    def test_non_custom_exception_handling(self):
        exc = Exception("Some other error")
        context = {"request": self.factory.get("/some-url/")}

        response = baseball_server_exception_handler(exc, context)

        self.assertIsNone(response)
