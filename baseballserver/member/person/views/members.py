from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.exceptions import SNUBaseballException
from ..models import Member
from ..permissions import IsAdminOrSelf
from ..serializers import MemberSimpleSerializer


class MembersViewSet(ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSimpleSerializer
    http_method_names = ["get", "patch"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminOrSelf]

        return [permission() for permission in permission_classes]

    @extend_schema(summary="부원 목록 조회", tags=["부원"])
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

    @extend_schema(summary="부원 기본 정보 수정", tags=["부원"])
    def partial_update(self, request, *args, **kwargs):
        ## back_number, birth_date, date_joined, num_semester 만 허용
        member = self.get_object()
        data = request.data

        allowed_fields = ["back_number", "birth_date", "date_joined", "num_semester"]
        for field in data.keys():
            if field not in allowed_fields:
                raise SNUBaseballException(
                    code="cannot_modify_field",
                    detail=f"{field} 필드는 수정할 수 없습니다.",
                )

        serializer = self.get_serializer(member, data=data, partial=True)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            raise SNUBaseballException(
                code="invalid_data", detail="유효하지 않은 데이터입니다."
            ) from e

        self.perform_update(serializer)

        ## return updated data
        return Response(data=serializer.data, status=status.HTTP_200_OK)
