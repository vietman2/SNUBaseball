from typing import TYPE_CHECKING

__all__ = ("MeAPIView", "RegisterView", "StudentIdCheckView", "UserRelatedSerializer")

if TYPE_CHECKING:
    from .serializers import UserRelatedSerializer
    from .views import MeAPIView, RegisterView, StudentIdCheckView


def __getattr__(name):
    if name == "UserRelatedSerializer":
        from .serializers import UserRelatedSerializer

        return UserRelatedSerializer
    if name == "MeAPIView":
        from .views import MeAPIView

        return MeAPIView
    if name == "RegisterView":
        from .views import RegisterView

        return RegisterView
    if name == "StudentIdCheckView":
        from .views import StudentIdCheckView

        return StudentIdCheckView
    raise AttributeError(f"{__name__} has no attribute {name!r}")
