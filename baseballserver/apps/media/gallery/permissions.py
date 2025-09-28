from rest_framework.permissions import BasePermission


class CanViewAlbum(BasePermission):
    """
    공개 앨범은 누구나, 부원 전용 앨범은 포털 클라이언트에 로그인한 사용자만 허용
    """

    header_name = "X-SNUBASEBALL-CLIENT"
    allowed_client = "snu-baseball-team-portal"

    def has_object_permission(self, request, view, obj):
        if not obj.members_only:
            return True

        client = request.headers.get(self.header_name, "")
        return client == self.allowed_client and request.user.is_authenticated
