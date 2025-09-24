from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response

from core.auth import IsAuthenticated
from core.error_handling import SNUBaseballException
from ..models import Album, MediaTag
from ..serializers import AlbumSerializer, MediaTagSerializer


class GalleryDataAPIView(GenericAPIView, ListModelMixin):
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "head", "options"]

    @extend_schema(summary="갤러리 앨범 및 태그 목록 조회", tags=["갤러리"])
    def get(self, request, *args, **kwargs):
        """
        갤러리 앨범 및 태그 목록 조회
          - 포털에만 제공되는 API로, 모든 갤러리 데이터를 한 번에 불러오기 위함
          - 공개 앨범 및 태그는 누구나 조회 가능
          - 멤버 전용 앨범 및 태그는 로그인한 사용자만 조회 가능 (단, 포털에서만)
        """
        client = request.headers.get("X-SNUBASEBALL-CLIENT", "")

        if client != "snu-baseball-team-portal":
            raise SNUBaseballException(
                "허용되지 않은 클라이언트입니다.", status_code=403
            )

        albums = Album.objects.all()
        albums_data = AlbumSerializer(albums, many=True).data

        tags = MediaTag.objects.all()
        tags_data = MediaTagSerializer(tags, many=True).data

        return Response(
            {"albums": albums_data, "tags": tags_data}, status=status.HTTP_200_OK
        )
