from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenVerifyView

from person.major.views import MajorViewSet
from person.user.views import RegisterView, StudentIdCheckView

router = DefaultRouter()

router.register('majors', MajorViewSet, basename='majors')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('student_id/', StudentIdCheckView.as_view(), name='student_id_check'),

    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
]

urlpatterns += router.urls
