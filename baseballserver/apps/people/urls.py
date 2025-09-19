from django.urls import path

from .members.api import MajorListAPIView
from .tokens.api import (
    SNUTokenObtainPairView,
    SNUTokenRefreshView,
    SNUTokenBlacklistView,
)
from .users.api import MeAPIView, RegisterView, StudentIdCheckView

urlpatterns = [
    path("v1/login/", SNUTokenObtainPairView.as_view(), name="login"),
    path("v1/logout/", SNUTokenBlacklistView.as_view(), name="logout"),
    path("v1/tokens/refresh/", SNUTokenRefreshView.as_view(), name="token_refresh"),
    path("v1/register/", RegisterView.as_view(), name="register"),
    path("v1/register/sid/", StudentIdCheckView.as_view(), name="student_id_check"),
    path("v1/me/", MeAPIView.as_view(), name="me"),
    path("v1/majors/", MajorListAPIView.as_view(), name="majors_list"),
]
