from typing import TYPE_CHECKING

__all__ = [
    "Member",
    "MajorListAPIView",
    "MemberDetailsSerializer",
    "MembersViewSet",
]

if TYPE_CHECKING:
    ## To avoid circular import issues
    ## 타입 체크용. 런타임 시점에는 import 하지 않음
    from .models import Member
    from .serializers import MemberDetailsSerializer
    from .views import MajorListAPIView, MembersViewSet


def __getattr__(name):
    if name == "Member":
        from .models import Member

        return Member
    if name == "MajorListAPIView":
        from .views import MajorListAPIView

        return MajorListAPIView
    if name == "MemberDetailsSerializer":
        from .serializers import MemberDetailsSerializer

        return MemberDetailsSerializer
    if name == "MembersViewSet":
        from .views import MembersViewSet

        return MembersViewSet
    raise AttributeError(name)
