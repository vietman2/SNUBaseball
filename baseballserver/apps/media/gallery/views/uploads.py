from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from apps.media.storage.api import PresignItemSerializer
from core.error_handling import SNUBaseballException
from ..models import Album
from ..serializers import GalleryUploadCompleteSerializer
from ..services import presign_for_album_item, complete_album_uploads


class AlbumUploadView(GenericViewSet):
    queryset = Album.objects.all()
    permission_classes = [IsAuthenticated]

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
