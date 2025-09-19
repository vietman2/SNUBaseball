from rest_framework_simplejwt.views import TokenObtainPairView

from core.auth import set_refresh_cookie
from ..serializers import SNUTokenObtainPairSerializer


class SNUTokenObtainPairView(TokenObtainPairView):
    serializer_class = SNUTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        res = super().post(request, *args, **kwargs)

        refresh_token = res.data.pop("refresh")

        return set_refresh_cookie(res, refresh_token)
