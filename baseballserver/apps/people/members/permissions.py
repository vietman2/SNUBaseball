from core.auth import IsAuthenticated, IsOps


class IsOpsOrSelf(IsAuthenticated):
    """
    운영진 혹은 유저 본인만 통과 시켜주는 객체 단위 권한
    """

    def has_object_permission(self, request, view, obj):
        ### 운영진은 통과
        if IsOps().has_permission(request, view):
            return True

        ### 운영진이 아닐 경우 본인 여부 확인
        return obj.user == request.user
