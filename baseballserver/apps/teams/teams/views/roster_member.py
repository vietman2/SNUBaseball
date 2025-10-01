from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.auth import AllowAny
from ..models import RosterMember
from ..serializers import RosterMemberDetailsSerializer


class RosterMemberAPIView(APIView):
    """
    특정 연도/학기의 팀 로스터 멤버를 조회한다.
    """

    permission_classes = [AllowAny]

    @extend_schema(
        summary="팀 로스터 멤버 조회",
        tags=["팀 관리"],
        responses={
            200: "로스터 멤버 조회 성공",
            400: "잘못된 요청",
            404: "로스터 멤버 없음",
        },
    )
    def get(self, request, member_id: int):
        roster_member = RosterMember.objects.filter(pk=member_id).first()

        if roster_member is None:
            return Response(
                {"detail": "해당 ID의 팀 로스터 멤버가 존재하지 않습니다."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = RosterMemberDetailsSerializer(roster_member)
        return Response(serializer.data, status=status.HTTP_200_OK)
