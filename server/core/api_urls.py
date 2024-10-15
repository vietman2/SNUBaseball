from django.urls import path
from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.jwt_auth import get_refresh_view
from rest_framework.routers import DefaultRouter

from person.major.views import MajorViewSet
from person.user.views import RegisterView, StudentIdCheckView, UserProfileView

router = DefaultRouter()

router.register('majors', MajorViewSet, basename='majors')
router.register('profiles', UserProfileView, basename='profile')

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('student_id/', StudentIdCheckView.as_view(), name='student_id_check'),

    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
]

urlpatterns += router.urls
