from drf_spectacular.utils import extend_schema
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import TeamRoster
from ..serializers import RosterSerializer


class RosterAPIView(APIView):
    """
    특정 연도/학기의 팀 로스터를 조회한다.
    param이 없으면, 현재 연도/학기의 팀 로스터를 조회한다.
    """

    permission_classes = [AllowAny]

    def _parse_query_param(self, param: str | None) -> tuple[int, int] | None:
        if param is None:
            now = timezone.now()
            year = now.year
            month = now.month
            semester = 1 if month <= 8 else 2

            return year, semester
        try:
            year_str, semester_str = param.split("-")
            year = int(year_str)
            semester = int(semester_str)

            return year, semester
        except ValueError:
            return None

    @extend_schema(
        summary="팀 로스터 조회",
        tags=["팀 관리"],
        parameters=[
            {
                "name": "semester",
                "description": "조회할 연도-학기 (예: 2025-1 -> 2025년 1학기 // 지정하지 않으면, 현재 학기로 조회)",
                "required": False,
                "type": str,
            },
        ],
        responses={200: "로스터 조회 성공", 400: "잘못된 요청"},
    )
    def get(self, request):
        team_code = request.query_params.get("semester", None)
        parsed = self._parse_query_param(team_code)
        if parsed is None:
            return Response(
                {"detail": "파라미터 형식이 잘못되었습니다."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        year, semester = parsed

        roster = TeamRoster.objects.filter(year=year, semester=semester).first()
        if roster is None:
            return Response(
                {"detail": "해당 연도/학기의 팀 로스터가 존재하지 않습니다."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = RosterSerializer(roster)
        return Response(serializer.data, status=status.HTTP_200_OK)
