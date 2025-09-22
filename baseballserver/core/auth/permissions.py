from rest_framework.permissions import BasePermission


class IsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_active


class IsOps(IsAuthenticated):
    """
    운영진: 주장/부주장/매니저
    + Superuser는 모든 권한이 있기 때문에 포함
    """

    def has_permission(self, request, view):
        if not super().has_permission(request, view):
            return False

        return (
            request.user.member.role.is_leadership
            or request.user.member.role.is_manager
            or request.user.is_superuser
        )
