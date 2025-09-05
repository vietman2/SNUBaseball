from rest_framework.routers import DefaultRouter

from .person.views import ProfileViewSet

router = DefaultRouter()

router.register(r"v1/profiles", ProfileViewSet, basename="profiles")

urlpatterns = router.urls
