from typing import TYPE_CHECKING

__all__ = ("RosterAPIView", "RosterMemberAPIView")

if TYPE_CHECKING:
    from .views import RosterAPIView, RosterMemberAPIView


def __getattr__(name):
    if name == "RosterAPIView":
        from .views import RosterAPIView

        return RosterAPIView
    if name == "RosterMemberAPIView":
        from .views import RosterMemberAPIView

        return RosterMemberAPIView
    raise AttributeError(f"{__name__} has no attribute {name!r}")
