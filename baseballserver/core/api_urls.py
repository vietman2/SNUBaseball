from django.urls import path
from dj_rest_auth.views import LoginView, LogoutView
from rest_framework.routers import DefaultRouter

from auth.user.views import StudentIdCheckView, RegisterView, TokenRefreshView


router = DefaultRouter()

## Auth Apps
urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("student_id/", StudentIdCheckView.as_view(), name="student_id_check"),
    path("signup/", RegisterView.as_view(), name="register"),
    path("tokens/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns += router.urls
