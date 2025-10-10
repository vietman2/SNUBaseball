from rest_framework.permissions import BasePermission


_HEADER_NAME = "X-SNUBASEBALL-CLIENT"
_ALLOWED_CLIENT = "snu-baseball-team-portal"


def _is_authenticated(request):
    client = request.headers.get(_HEADER_NAME, "")

    if client != _ALLOWED_CLIENT:
        return False

    return request.user and request.user.is_authenticated and request.user.is_active


class IsAuthenticated(BasePermission):
    """
    인증된 사용자
      - 반드시, 포털에서 접근해야 함
    """

    def has_permission(self, request, view):
        return _is_authenticated(request)


class AllowAny(BasePermission):
    """
    누구나
    """

    def has_permission(self, request, view):
        ## 누구나 접근 가능
        ## - 단, 로그인했는지 확인할 수 있는 함수를 포함
        is_authenticated = _is_authenticated(request)

        setattr(request, "is_authenticated", is_authenticated)

        return True


class IsOps(IsAuthenticated):
    """
    운영진: 주장/부주장/매니저
    + Superuser는 모든 권한이 있기 때문에 포함
      - 단, 반드시 포털에서 접근해야 함
    """

    def has_permission(self, request, view):
        if not super().has_permission(request, view):
            return False

        if getattr(request.user, "is_superuser", False):
            return True

        member = getattr(request.user, "member", None)
        role = getattr(member, "role", None)

        return bool(
            getattr(role, "is_leadership", False) or getattr(role, "is_manager", False)
        )
