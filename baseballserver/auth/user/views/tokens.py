from dj_rest_auth.jwt_auth import (
    CookieTokenRefreshSerializer,
    set_jwt_access_cookie,
    set_jwt_refresh_cookie,
)
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView as SimpleTokenRefreshView

from auth.user.models import User
from auth.user.serializers import ProfileSerializer


class TokenRefreshView(SimpleTokenRefreshView):
    """
    Token을 Refresh할 때에도 유저 정보를 응답에 포함시키기 위해 만든 Custom API.
    """

    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.status_code == status.HTTP_200_OK:
            ## 2. 응답에 유저 정보를 추가
            token = RefreshToken(response.data["refresh"])
            user = User.objects.get(uuid=token.payload.get("user_id"))

            response.data["user"] = ProfileSerializer(user).data

            ## 3. 쿠키에 토큰을 설정
            set_jwt_access_cookie(response, token)
            set_jwt_refresh_cookie(response, token)

            response.data.pop("refresh", None)

        return super().finalize_response(request, response, *args, **kwargs)
