from typing import TYPE_CHECKING

__all__ = (
    "AuthBackend",
    "set_refresh_cookie",
    "delete_refresh_cookie",
    "PasswordValidator",
    "IsAuthenticated",
    "AllowAny",
    "IsOps",
)

if TYPE_CHECKING:
    from .backend import AuthBackend
    from .cookies import set_refresh_cookie, delete_refresh_cookie
    from .password import PasswordValidator
    from .permissions import IsAuthenticated, IsOps, AllowAny


def __getattr__(name): ## pylint: disable=too-many-return-statements
    if name == "AuthBackend":
        from .backend import AuthBackend

        return AuthBackend
    if name == "set_refresh_cookie":
        from .cookies import set_refresh_cookie

        return set_refresh_cookie
    if name == "delete_refresh_cookie":
        from .cookies import delete_refresh_cookie

        return delete_refresh_cookie
    if name == "PasswordValidator":
        from .password import PasswordValidator

        return PasswordValidator
    if name == "IsAuthenticated":
        from .permissions import IsAuthenticated

        return IsAuthenticated
    if name == "AllowAny":
        from .permissions import AllowAny

        return AllowAny
    if name == "IsOps":
        from .permissions import IsOps

        return IsOps
    raise AttributeError(name)
