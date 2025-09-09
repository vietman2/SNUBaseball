from rest_framework.routers import DefaultRouter

from .major.views import MajorViewSet
from .person.views import ProfileViewSet, MembersViewSet

router = DefaultRouter()

router.register(r"v1/majors", MajorViewSet, basename="majors")
router.register(r"v1/members", MembersViewSet, basename="members")
router.register(r"v1/profiles", ProfileViewSet, basename="profiles")


urlpatterns = router.urls
