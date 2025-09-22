from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from apps.media.assets.api import SNUBaseballImage, presign_upload, complete_upload
from core.auth.permissions import IsAuthenticated, IsOps
from core.error_handling import SNUBaseballException
from ..models import Member
from ..permissions import IsOpsOrSelf
from ..serializers import (
    MemberDetailsSerializer,
    AvatarPresignSerializer,
    AvatarCompleteSerializer,
)


class MembersViewSet(ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberDetailsSerializer
    http_method_names = ["get", "patch", "post"]

    def get_permissions(self):
        ## 조회는 부원 누구나
        if self.action in ["list", "retrieve"]:
            permission_classes = [IsAuthenticated]
        ## 생성은 주장단/매니저만
        elif self.action == "create":
            permission_classes = [IsOps]
        ## 나머지는 관리자 또는 본인 (수정, 아바타 수정)
        else:
            permission_classes = [IsOpsOrSelf]

        return [permission() for permission in permission_classes]

    @extend_schema(summary="부원 목록 조회 (포털 부원 관리용)", tags=["부원"])
    def list(self, request, *args, **kwargs):
        players = Member.objects.active_players().order_by("role")
        managers = Member.objects.active_managers().order_by("role")

        player_data = self.get_serializer(players, many=True).data
        manager_data = self.get_serializer(managers, many=True).data

        return Response(
            {
                "players": player_data,
                "managers": manager_data,
            },
            status=status.HTTP_200_OK,
        )

    @extend_schema(summary="부원 정보 상세 조회", tags=["부원"])
    def retrieve(self, request, *args, **kwargs):
        member = self.get_object()
        serializer = self.get_serializer(member)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="부원 정보 생성", tags=["부원"])
    def create(self, request, *args, **kwargs):
        ## 일단 아직 구현 안함
        return Response(status=status.HTTP_501_NOT_IMPLEMENTED)

    @extend_schema(summary="부원 정보 수정", tags=["부원"])
    def partial_update(self, request, *args, **kwargs):
        ## back_number, birth_date, date_joined, num_semester 만 허용
        member = self.get_object()
        data = request.data

        serializer = self.get_serializer(member, data=data, partial=True)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            raise SNUBaseballException("잘못된 데이터입니다.") from e

        self.perform_update(serializer)

        ## return updated data
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="프로필 사진 업데이트 링크 생성", tags=["부원"])
    @action(detail=True, methods=["POST"], url_path="avatar/presign")
    def avatar_presign(self, request, pk=None):  ## pylint: disable=unused
        member = self.get_object()
        serializer = AvatarPresignSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            raise SNUBaseballException(
                code="INVALID", detail="유효하지 않은 데이터입니다."
            ) from e

        prefix = f"profiles/{member.id}/"

        data = serializer.validated_data

        out = presign_upload(
            prefix=prefix,
            filename=data["filename"],
            content_type=data.get("content_type"),  ## optional
            size=data["size"],
        )

        return Response(data=out, status=status.HTTP_200_OK)

    @extend_schema(summary="프로필 s 사진 업데이트 완료", tags=["부원"])
    @action(detail=True, methods=["PATCH"], url_path="avatar/complete")
    def avatar_complete(self, request, pk=None):  ## pylint: disable=unused
        member = self.get_object()
        serializer = AvatarCompleteSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            raise SNUBaseballException(
                code="INVALID", detail="유효하지 않은 데이터입니다."
            ) from e

        data = serializer.validated_data

        expected_prefix = f"profiles/{member.id}/"
        if not data["key"].startswith(expected_prefix):
            raise SNUBaseballException(code="INVALID", detail="유효하지 않은 키입니다.")

        asset = complete_upload(
            key=data["key"],
            original_filename=data.get("original_filename"),
            uploaded_by=request.user,
        )

        if not isinstance(asset, SNUBaseballImage):
            raise SNUBaseballException("이미지 파일만 업로드할 수 있습니다.")

        member.profile_image = asset
        member.save(update_fields=["profile_image"])

        return Response(
            data={"url": asset.url},
            status=status.HTTP_200_OK,
        )
