from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from core.validators import EmailValidator, UsernameValidator
from .serializers import RegisterSerializer
from .utils import get_error_message

class RegisterView(GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes=[AllowAny,]
    throttle_scope = 'dj_rest_auth'
    http_method_names = ['post', 'head', 'options']

    @extend_schema(summary="회원 가입", tags=["회원 관리"])
    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.validate_passwords(serializer.validated_data)
            username_validator = UsernameValidator()
            email_validator = EmailValidator()

            username_validator(serializer.validated_data['username'])
            email_validator(serializer.validated_data['email'])
        except ValidationError as e:
            error_message = get_error_message(e)
            return Response(data={
                "error": error_message,
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
