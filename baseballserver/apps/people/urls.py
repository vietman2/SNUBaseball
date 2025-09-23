from django.urls import path
from rest_framework.routers import DefaultRouter

from .members.api import MajorListAPIView, MembersViewSet
from .tokens.api import (
    SNUTokenObtainPairView,
    SNUTokenRefreshView,
    SNUTokenBlacklistView,
)
from .users.api import MeAPIView, RegisterView, StudentIdCheckView

router = DefaultRouter()

router.register(r"v1/members", MembersViewSet, basename="members")

urlpatterns = [
    ## 인증 관련
    path("v1/login/", SNUTokenObtainPairView.as_view(), name="login"),
    path("v1/logout/", SNUTokenBlacklistView.as_view(), name="logout"),
    path("v1/tokens/refresh/", SNUTokenRefreshView.as_view(), name="token_refresh"),
    ## 회원가입
    path("v1/register/", RegisterView.as_view(), name="register"),
    path("v1/register/sid/", StudentIdCheckView.as_view(), name="student_id_check"),
    ## 내 정보
    path("v1/me/", MeAPIView.as_view(), name="me"),
    ## 전공 목록
    path("v1/majors/", MajorListAPIView.as_view(), name="majors_list"),
]

urlpatterns += router.urls
