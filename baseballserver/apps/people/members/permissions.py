from core.auth import IsAuthenticated


class IsAdminOrSelf(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        return request.user.is_superuser or obj.user == request.user
