from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from core.exceptions import UnauthorizedException


class SNUTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            "password": attrs["password"],
        }
        user = authenticate(**authenticate_kwargs)

        if user is None:
            raise UnauthorizedException(
                detail="이메일 또는 비밀번호가 올바르지 않습니다.",
                code="INVALID_CREDENTIALS",
                status="UNAUTHORIZED",
                status_code=401,
            )

        return super().validate(attrs)
