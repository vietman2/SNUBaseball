from itertools import chain
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.auth import IsOps
from core.error_handling import SNUBaseballException
from ..models import Album
from ..paginators import MediaPageNumberPagination
from ..serializers import (
    AlbumSerializer,
    GalleryImageSerializer,
    GalleryVideoSerializer,
)


class AlbumViewSet(ModelViewSet):
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()
    http_method_names = ["get", "post"]

    def get_permissions(self):
        """
        조회는 누구나 가능
        생성/수정/삭제는 운영진만 가능
        """
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]

        return [IsOps()]

    @extend_schema(summary="앨범 목록 조회", tags=["갤러리"])
    def list(self, request, *args, **kwargs):
        """
        앨범 목록 조회 (Public API)
          - 공개 앨범은 누구나 조회 가능
        """
        queryset = self.get_queryset().filter(members_only=False)
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def _serialize_media(self, media):
        if media.type == "IMAGE":
            return GalleryImageSerializer(media).data

        return GalleryVideoSerializer(media).data

    @extend_schema(summary="앨범 상세 조회", tags=["갤러리"])
    def retrieve(self, request, *args, **kwargs):
        """
        앨범 상세 조회
          - 공개 앨범은 누구나 조회 가능
          - 멤버 전용 앨범은 로그인한 사용자만 조회 가능 (단, 포털에서만)
        """
        client = request.headers.get("X-SNUBASEBALL-CLIENT", "")
        album = self.get_object()

        if album.members_only and not (
            client == "snu-baseball-team-portal" and request.user.is_authenticated
        ):
            raise SNUBaseballException("접근 권한이 없습니다.", status_code=403)

        album_data = self.get_serializer(album).data

        all_images = album.images.all()
        all_videos = album.videos.all()
        all_media = sorted(
            chain(all_images, all_videos),
            key=lambda media: media.created_at,
            reverse=True,
        )

        paginator = MediaPageNumberPagination()
        page_objs = paginator.paginate_queryset(all_media, request, view=self)

        media_data = [self._serialize_media(media) for media in page_objs]

        data = {
            "album": album_data,
            "media": media_data,
            "current_page": paginator.page.number,
            "next_page_url": paginator.get_next_link(),
            "prev_page_url": paginator.get_previous_link(),
            "num_pages": paginator.page.paginator.num_pages,
            "total_media": paginator.page.paginator.count,
        }

        return Response(data, status=status.HTTP_200_OK)

    @extend_schema(summary="앨범 생성", tags=["갤러리"])
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
