from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from ..models import Member
from ..serializers import MemberSimpleSerializer


class MembersViewSet(ModelViewSet):
    queryset = Member.objects.active_members()
    permission_classes = [AllowAny]
    serializer_class = MemberSimpleSerializer
    http_method_names = ["get"]

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
