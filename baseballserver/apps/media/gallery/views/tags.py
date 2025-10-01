from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.auth import IsOps, AllowAny
from ..models import MediaTag
from ..serializers import MediaTagSerializer


class MediaTagViewSet(ModelViewSet):
    serializer_class = MediaTagSerializer
    queryset = MediaTag.objects.all()
    http_method_names = ["get", "post", "put", "delete"]
    lookup_field = "id"

    def get_permissions(self):
        """
        조회는 누구나 가능
        생성/수정/삭제는 운영진만 가능
        """
        if self.action in ["list"]:
            return [AllowAny()]
        return [IsOps()]

    @extend_schema(summary="태그 목록 조회", tags=["갤러리"])
    def list(self, request, *args, **kwargs):
        """
        태그 목록 조회
          - 포털에서 로그인하고 접근하는 경우, 전부 조회
          - 그 외의 경우, 미디어에 하나라도 연결이 되어있는 태그만 조회
        """
        if getattr(request, "is_authenticated", False):
            tags = MediaTag.objects.all()
        else:
            tags = MediaTag.objects.filter(
                Q(images__isnull=False) | Q(videos__isnull=False)
            ).distinct()

        serializer = self.get_serializer(tags, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @extend_schema(summary="태그 생성", tags=["갤러리"])
    def create(self, request, *args, **kwargs):
        """
        태그 생성 (운영진 전용)
        """
        return super().create(request, *args, **kwargs)

    @extend_schema(summary="태그 수정", tags=["갤러리"])
    def update(self, request, *args, **kwargs):
        """
        태그 수정 (운영진 전용)
        """
        return super().update(request, *args, **kwargs)

    @extend_schema(summary="태그 삭제", tags=["갤러리"])
    def destroy(self, request, *args, **kwargs):
        """
        태그 삭제 (운영진 전용)
        """
        return super().destroy(request, *args, **kwargs)
