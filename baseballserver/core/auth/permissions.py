from rest_framework.permissions import BasePermission


_HEADER_NAME = "X-SNUBASEBALL-CLIENT"
_ALLOWED_CLIENT = "snu-baseball-team-portal"


class IsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        client = request.headers.get(_HEADER_NAME, "")

        if client != _ALLOWED_CLIENT:
            return False

        return request.user and request.user.is_authenticated and request.user.is_active


class IsOps(IsAuthenticated):
    """
    운영진: 주장/부주장/매니저
    + Superuser는 모든 권한이 있기 때문에 포함
      - 단, 반드시 포털에서 접근해야 함
    """

    def has_permission(self, request, view):
        if not super().has_permission(request, view):
            return False

        client = request.headers.get(_HEADER_NAME, "")

        if client != _ALLOWED_CLIENT:
            return False

        return (
            request.user.member.role.is_leadership
            or request.user.member.role.is_manager
            or request.user.is_superuser
        )
