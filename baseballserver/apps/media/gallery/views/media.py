from django.db.models import F, Q, Value, CharField, IntegerField
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView

from core.auth import AllowAny
from core.error_handling import SNUBaseballException
from ..models import GalleryImage, GalleryVideo
from ..paginators import MediaPageNumberPagination
from ..selectors import fetch_media_page_objects
from ..serializers import GalleryImageSerializer, GalleryVideoSerializer


class GalleryMediaAPIView(APIView):
    """
    갤러리 미디어 목록 조회
      - 미디어를 paginate해서 반환하며,
      - album, tags로 필터링 가능
      - 단, 포털에서 로그인한 유저는 모든 미디어에 접근 가능하지만,
      - 그렇지 않은 경우는, 공개 앨범에 속한 미디어만 접근 가능하다
    """

    permission_classes = [AllowAny]
    http_method_names = ["get", "head", "options"]

    def _serialize_batch(self, objs):
        result = []
        for obj in objs:
            if isinstance(obj, GalleryImage):
                result.append(GalleryImageSerializer(obj).data)
            elif isinstance(obj, GalleryVideo):
                result.append(GalleryVideoSerializer(obj).data)
            else:
                ## 알 수 없는 미디어 객체 처리
                ## (정상적인 상황에서는 발생하지 않음)
                raise SNUBaseballException("알 수 없는 미디어 객체입니다.")
        return result

    def _get_images_queryset(self, request, album_title, tag_ids):
        image_q = Q()
        if not getattr(request, "is_authenticated", False):
            image_q &= Q(album__members_only=False)
        if album_title:
            image_q &= Q(album__title=album_title)
        if tag_ids:
            image_q &= Q(tags__id__in=tag_ids)

        images_base = (
            GalleryImage.objects.filter(image_q)
            .select_related("album", "image")
            .prefetch_related("tags")
        )

        images_queryset = images_base.annotate(
            media_type=Value("image", output_field=CharField()),
            media_id=F("pk"),
            media_created_at=F("image__file__created_at"),
            type_order=Value(0, output_field=IntegerField()),  # 이미지 우선
        ).values("media_type", "media_id", "media_created_at", "type_order")

        return images_queryset

    def _get_videos_queryset(self, request, album_title, tag_ids):
        video_q = Q()
        if not getattr(request, "is_authenticated", False):
            video_q &= Q(album__members_only=False)
        if album_title:
            video_q &= Q(album__title=album_title)
        if tag_ids:
            video_q &= Q(tags__id__in=tag_ids)

        videos_base = (
            GalleryVideo.objects.filter(video_q)
            .select_related("album", "video")
            .prefetch_related("tags")
        )

        videos_queryset = videos_base.annotate(
            media_type=Value("video", output_field=CharField()),
            media_id=F("pk"),
            media_created_at=F("video__file__created_at"),
            type_order=Value(1, output_field=IntegerField()),
        ).values("media_type", "media_id", "media_created_at", "type_order")

        return videos_queryset

    @extend_schema(summary="갤러리 미디어 목록 조회", tags=["갤러리"])
    def get(self, request, *args, **kwargs):
        ## 1. Query Param 파싱
        album_title = request.query_params.get("album", None)
        tags = request.query_params.getlist("tags", [])

        try:
            tag_ids = [int(x) for x in tags if x.strip()]
        except ValueError:
            raise SNUBaseballException("잘못된 태그 쿼리입니다.", status_code=400)

        ## 2. 필터링된 이미지/동영상 쿼리셋 생성
        images_qs = self._get_images_queryset(request, album_title, tag_ids)
        videos_qs = self._get_videos_queryset(request, album_title, tag_ids)

        union_qs = images_qs.union(videos_qs, all=True).order_by(
            "-media_created_at", "-type_order", "-media_id"
        )

        paginator = MediaPageNumberPagination()
        page_rows = paginator.paginate_queryset(union_qs, request, view=self)

        page_objs = fetch_media_page_objects(page_rows)
        media_data = self._serialize_batch(page_objs)

        return paginator.get_paginated_response(media_data)
