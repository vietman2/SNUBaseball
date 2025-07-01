from io import StringIO
from unittest.mock import MagicMock, patch
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.test.utils import override_settings
from rest_framework import status
from rest_framework.exceptions import APIException, ValidationError
from rest_framework.test import APIRequestFactory, APITestCase

from core.exceptions import baseball_server_exception_handler


class CustomExceptionHandlerTestCase(APITestCase):
    def setUp(self):
        self.context = MagicMock()

    @override_settings(DEBUG=True)
    def test_debug_prints_exception(self):
        ## if settings.DEBUG일 경우, exception을 콘솔에 출력하는지 확인
        ## exception_handler의 첫번째 분기를 테스트한다.
        exc = ValueError("An unexpected error occurred")

        buf = StringIO()
        with patch("sys.stdout", buf):
            response = baseball_server_exception_handler(exc, self.context)

        self.assertIsNotNone(response)

    def test_drf_validation_error_list(self):
        ## exception handler의 두번째 분기인 drf ValidationError 중,
        ## 오류가 리스트 형태로 전달되는 경우를 테스트 (기본 형태)
        exc = ValidationError(detail=["Validation 오류가 발생했습니다."])
        factory = APIRequestFactory()
        request = factory.get("/test")
        self.context = {"request": request}

        response = baseball_server_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "Validation 오류가 발생했습니다."})

    def test_drf_validation_error_dict(self):
        ## exception handler의 두번째 분기인 drf ValidationError 중,
        ## 오류가 딕셔너리 형태로 전달되는 경우를 테스트
        exc = ValidationError(detail={"foo": ["bar"]})
        factory = APIRequestFactory()
        request = factory.get("/test")
        self.context = {"request": request}

        response = baseball_server_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "bar"})

    def test_drf_validation_error_unexpected(self):
        ## exception handler의 두번째 분기인 drf ValidationError 중,
        ## 오류 유형이 불확실할 때 "오류가 발생했습니다." 메시지를 띄우는지 테스트
        exc = ValidationError(detail=[{"foo": "bar"}])

        response = baseball_server_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "오류가 발생했습니다."})

    def test_token_expiration(self):
        ## placeholder test
        exc = APIException(
            detail={
                "code": "token_not_valid",
                "messages": [{"token_type": "access"}],
            },
        )
        exc.status_code = status.HTTP_401_UNAUTHORIZED

        response = baseball_server_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data, {"error": "Access Token이 만료되었습니다."})

    def test_token_expiration_invalid(self):
        ## placeholder test
        exc = APIException(
            detail="some other error",
        )
        exc.status_code = status.HTTP_401_UNAUTHORIZED

        response = baseball_server_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {"error": "some other error"})

    def test_default_drf_error(self):
        exc = Http404("Not Found")
        factory = APIRequestFactory()
        request = factory.get("/test")
        self.context = {"request": request}

        response = baseball_server_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_object_not_found_error(self):
        ## exception handler의 첫번째 분기인 ObjectDoesNotExist 예외를 처리하는지 테스트
        exc = ObjectDoesNotExist("해당 객체를 찾을 수 없습니다.")
        factory = APIRequestFactory()
        request = factory.get("/test")
        self.context = {"request": request}

        response = baseball_server_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data, {"error": "해당 객체를 찾을 수 없습니다."})

    def test_server_error(self):
        exc = ValueError("An unexpected error occurred")
        factory = APIRequestFactory()
        request = factory.get("/test")
        self.context = {"request": request}

        response = baseball_server_exception_handler(exc, self.context)
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
