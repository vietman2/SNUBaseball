from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenVerifyView

from archive.memories.views import MemoryViewSet
from user.views import RegisterView, MajorViewSet, PersonViewSet

router = DefaultRouter()

router.register('majors', MajorViewSet, basename='majors')
router.register('members', PersonViewSet, basename='people')
router.register('memories', MemoryViewSet, basename='memories')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),

    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
]

urlpatterns += router.urls
