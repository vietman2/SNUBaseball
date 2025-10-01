from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from core.auth import AllowAny
from core.error_handling import SNUBaseballException
from ..serializers import RegisterSerializer


class RegisterView(GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post"]

    @extend_schema(summary="회원가입", tags=["회원 관리"])
    def post(self, request, *args, **kwargs):  ## pylint: disable=unused-argument
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except ValidationError as e:
            raise SNUBaseballException(detail=str(e.detail)) from e

        return Response(
            {"message": "회원가입이 완료되었습니다."},
            status=status.HTTP_201_CREATED,
        )
