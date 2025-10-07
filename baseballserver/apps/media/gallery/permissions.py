from core.auth import IsAuthenticated, IsOps


class IsOpsOrUploader(IsAuthenticated):
    """
    운영진 혹은 미디어 업로더만 통과 시켜주는 객체 단위 권한
    """

    def has_object_permission(self, request, view, obj):
        ### 운영진은 통과
        if IsOps().has_permission(request, view):
            return True

        ### 운영진이 아닐 경우 업로더 여부 확인
        if hasattr(obj, "image"):
            return obj.image.uploaded_by == request.user
        elif hasattr(obj, "video"):
            return obj.video.uploaded_by == request.user

        return False
