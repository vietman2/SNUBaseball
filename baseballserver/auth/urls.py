from django.urls import path

from .tokens.views import (
    SNUTokenObtainPairView,
    SNUTokenBlacklistView,
    SNUTokenRefreshView,
)
from .user.views import MeAPIView

urlpatterns = [
    path("v1/login/", SNUTokenObtainPairView.as_view(), name="login"),
    path("v1/logout/", SNUTokenBlacklistView.as_view(), name="logout"),
    path("v1/tokens/refresh/", SNUTokenRefreshView.as_view(), name="token_refresh"),
    path("v1/me/", MeAPIView.as_view(), name="me"),
]
