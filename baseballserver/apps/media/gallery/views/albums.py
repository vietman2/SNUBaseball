from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.auth import IsOps, AllowAny
from core.error_handling import SNUBaseballException
from ..models import Album
from ..serializers import AlbumSerializer


class AlbumViewSet(ModelViewSet):
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()
    http_method_names = ["get", "post", "put", "delete"]
    lookup_field = "title"

    def get_permissions(self):
        """
        조회는 누구나 가능
        생성/수정/삭제는 운영진만 가능
        """
        if self.action in ["list"]:
            return [AllowAny()]
        return [IsOps()]

    @extend_schema(summary="앨범 목록 조회", tags=["갤러리"])
    def list(self, request, *args, **kwargs):
        """
        앨범 목록 조회 (Public API)
          - 공개 앨범은 누구나 조회 가능
          - 부원 전용 앨범은 포털에서 로그인한 사용자만 조회 가능
        """
        if getattr(request, "is_authenticated", False):
            queryset = Album.objects.all()
        else:
            queryset = Album.objects.filter(members_only=False)

        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @extend_schema(summary="앨범 생성", tags=["갤러리"])
    def create(self, request, *args, **kwargs):
        """
        앨범 생성 (운영진 전용)
        """
        try:
            res = super().create(request, *args, **kwargs)
        except ValidationError as e:
            raise SNUBaseballException(
                "이미 존재하는 앨범 제목입니다."
            ) from e  ## Integrity Error가 발생하는건 이거 하나밖에 없다.
        return res

    @extend_schema(summary="앨범 수정", tags=["갤러리"])
    def update(self, request, *args, **kwargs):
        """
        앨범 수정 (운영진 전용)
        """
        try:
            res = super().update(request, *args, **kwargs)
        except ValidationError as e:
            raise SNUBaseballException("이미 존재하는 앨범 제목입니다.") from e
        return res

    @extend_schema(summary="앨범 삭제", tags=["갤러리"])
    def destroy(self, request, *args, **kwargs):
        """
        앨범 삭제 (운영진 전용)
          - 앨범 삭제 시, 해당 앨범에 속한 미디어들을 다른 앨범에 지정해주고 삭제해야 한다.
        """
        ## 앨범에 이미지나 동영상이 없으면 곧바로 삭제
        album = self.get_object()

        if not album.images.exists() and not album.videos.exists():
            return super().destroy(request, *args, **kwargs)

        ## TODO: 그렇지 않으면, reassign album 필드를 받아서 해당 앨범으로 미디어들을 이동시킨 후 삭제

        ## 일단, 400 응답으로 대체

        return Response(
            data={
                "message": "앨범에 속한 이미지/동영상이 존재합니다. 이동시킬 다른 앨범을 지정해주세요."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
