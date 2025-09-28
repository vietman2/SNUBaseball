from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from apps.media.storage.api import PresignItemSerializer
from core.auth import IsOps
from core.error_handling import SNUBaseballException
from ..models import Album
from ..paginators import MediaPageNumberPagination
from ..permissions import CanViewAlbum
from ..selectors import album_media_union_queryset, fetch_media_page_objects
from ..serializers import AlbumSerializer, GalleryUploadCompleteSerializer
from ..services import (
    serialize_gallery_media,
    presign_for_album_item,
    complete_album_uploads,
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
        if self.action in ["list"]:
            return [AllowAny()]
        if self.action in ["retrieve"]:
            return [CanViewAlbum()]
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

    @extend_schema(summary="앨범 상세 조회", tags=["갤러리"])
    def retrieve(self, request, *args, **kwargs):
        """
        앨범 상세 조회
          - 공개 앨범은 누구나 조회 가능
          - 멤버 전용 앨범은 로그인한 사용자만 조회 가능 (단, 포털에서만)
        """
        album = self.get_object()
        album_data = self.get_serializer(album).data

        media_union = album_media_union_queryset(album)
        paginator = MediaPageNumberPagination()
        page_rows = paginator.paginate_queryset(media_union, request, view=self)

        page_objs = fetch_media_page_objects(page_rows)
        media_data = serialize_gallery_media(page_objs)

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

    @extend_schema(summary="앨범 사진 업로드", tags=["갤러리"])
    @action(detail=True, methods=["POST"], url_path="upload/presign")
    def upload_presign(self, request, pk=None):
        album = self.get_object()
        schema = PresignItemSerializer(data=request.data)

        try:
            schema.is_valid(raise_exception=True)
        except ValidationError as e:
            raise SNUBaseballException(
                code="INVALID", detail="유효하지 않은 데이터입니다."
            ) from e

        payload = schema.validated_data
        result = presign_for_album_item(
            album,
            filename=payload["filename"],
            content_type=payload.get("content_type", ""),
            size=payload["size"],
        )

        return Response(result, status=status.HTTP_200_OK)

    @extend_schema(summary="앨범 사진 업로드 완료 처리", tags=["갤러리"])
    @action(detail=True, methods=["POST"], url_path="upload/complete")
    def upload_complete(self, request, pk=None):
        album = self.get_object()
        schema = GalleryUploadCompleteSerializer(data=request.data)

        try:
            schema.is_valid(raise_exception=True)
        except ValidationError as e:
            raise SNUBaseballException(
                code="INVALID", detail="유효하지 않은 데이터입니다."
            ) from e

        items = schema.validated_data["items"]
        tag_ids = schema.validated_data.get("tag_ids", [])
        errors = complete_album_uploads(
            album=album, items=items, tag_ids=tag_ids, user=request.user
        )

        if errors:
            return Response(
                {"detail": "일부 항목에서 오류가 발생했습니다.", "errors": errors},
                status=status.HTTP_207_MULTI_STATUS,
            )

        return Response(status=status.HTTP_204_NO_CONTENT)
