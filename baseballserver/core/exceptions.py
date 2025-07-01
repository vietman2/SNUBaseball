from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.exceptions import APIException, ValidationError
from rest_framework.response import Response
from rest_framework.views import exception_handler


def baseball_server_exception_handler(exc, context):
    """
    커스텀 예외 처리 함수
    """
    response = exception_handler(exc, context)

    ## 개발서버이면 예외를 콘솔에 출력
    if settings.DEBUG:
        print(exc)

    if response is not None:
        if isinstance(exc, ValidationError):
            return get_drf_validation_error_response(exc)

        if isinstance(exc, APIException):
            return get_drf_api_error_response(exc)

        return response

    if isinstance(exc, ObjectDoesNotExist):
        return get_object_not_found_error_response(exc)

    return Response(
        data={"error": "오류가 발생했습니다."},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )


def is_access_token_expired(e: APIException) -> bool:
    """
    Access Token이 만료된 경우 True를 반환하는 함수
    """
    try:
        return (
            e.status_code == status.HTTP_401_UNAUTHORIZED
            and e.detail["code"] == "token_not_valid"
            and e.detail["messages"][0]["token_type"] == "access"
        )
    except (KeyError, TypeError):
        return False


def get_drf_api_error_response(e: APIException) -> Response:
    """
    DRF APIException을 처리하는 함수
        - Access Token이 만료된 경우, 기본 응답을 반환
    """

    if is_access_token_expired(e):
        return Response(
            data={"error": "Access Token이 만료되었습니다."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    return Response(data={"error": str(e.detail)}, status=status.HTTP_400_BAD_REQUEST)


def get_drf_validation_error_response(e: ValidationError) -> Response:
    """
    DRF ValidationError를 처리하는 함수
    """
    if isinstance(e.detail, list) and isinstance(e.detail[0], str):
        return Response(data={"error": e.detail[0]}, status=status.HTTP_400_BAD_REQUEST)
    if isinstance(e.detail, dict):
        first_error = list(e.detail.values())[0]
        error_msg = str(first_error[0])
        return Response(
            data={"error": error_msg},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(
        data={"error": "오류가 발생했습니다."}, status=status.HTTP_400_BAD_REQUEST
    )


def get_object_not_found_error_response(e: ObjectDoesNotExist) -> Response:
    """
    ObjectDoesNotExist를 처리하는 함수
    """
    return Response(data={"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
