from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenVerifyView

from person.major.views import MajorViewSet

router = DefaultRouter()

router.register('majors', MajorViewSet, basename='majors')

urlpatterns = [

    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
]

urlpatterns += router.urls
