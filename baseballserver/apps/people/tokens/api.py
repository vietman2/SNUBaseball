from typing import TYPE_CHECKING

__all__ = ("SNUTokenObtainPairView", "SNUTokenBlacklistView", "SNUTokenRefreshView")

if TYPE_CHECKING:
    from .views import SNUTokenObtainPairView
    from .views import SNUTokenBlacklistView
    from .views import SNUTokenRefreshView


def __getattr__(name: str):
    if name == "SNUTokenObtainPairView":
        from .views import SNUTokenObtainPairView

        return SNUTokenObtainPairView
    if name == "SNUTokenBlacklistView":
        from .views import SNUTokenBlacklistView

        return SNUTokenBlacklistView
    if name == "SNUTokenRefreshView":
        from .views import SNUTokenRefreshView

        return SNUTokenRefreshView
    raise AttributeError(f"tokens.api has no attribute {name!r}")
