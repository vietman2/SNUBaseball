from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenBlacklistSerializer
from rest_framework_simplejwt.views import TokenBlacklistView

from core.auth import delete_refresh_cookie
from core.error_handling import UnauthorizedException, InvalidRefreshTokenException


class SNUTokenBlacklistView(TokenBlacklistView):
    serializer_class = TokenBlacklistSerializer

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("x_snubaseball_ref_tok")

        if not refresh_token:
            raise UnauthorizedException("리프레시 토큰이 제공되지 않았습니다.")

        serializer = self.get_serializer(data={"refresh": refresh_token})

        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            raise InvalidRefreshTokenException() from e

        response = Response(
            {"detail": "로그아웃 되었습니다."}, status=status.HTTP_200_OK
        )

        return delete_refresh_cookie(response)
