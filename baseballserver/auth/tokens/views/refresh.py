from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenRefreshView

from auth.tokens.utils import set_refresh_cookie
from core.exceptions import UnauthorizedException, InvalidRefreshTokenException


class SNUTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("x_snubaseball_ref_tok")

        if not refresh_token:
            raise UnauthorizedException(
                detail="리프레시 토큰이 존재하지 않습니다. 다시 로그인 해주세요."
            )

        serializer = TokenRefreshSerializer(data={"refresh": refresh_token})
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            raise InvalidRefreshTokenException() from e

        res = Response(serializer.validated_data, status=status.HTTP_200_OK)

        new_refresh_token = serializer.validated_data.pop("refresh")

        res = set_refresh_cookie(res, new_refresh_token)

        return res
