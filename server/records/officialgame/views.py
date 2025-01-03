from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .modelsdir.game import Game
from .modelsdir.tournament import TournamentEvent
from .serializers import TournamentSerializer, GameResultSerializer

class ResultsView(ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameResultSerializer
    http_method_names = ['get']

    def get_permissions(self):
        return [IsAuthenticated(),]

    @extend_schema(summary="대회별 경기결과 조회", tags=["대회별 경기결과"])
    def list(self, request, *args, **kwargs):
        year = request.query_params.get('year', None)

        if year is None:
            return Response({
                'message': '잘못된 요청입니다.'
            }, status=status.HTTP_400_BAD_REQUEST)

        tournaments = TournamentEvent.objects.filter(year=year)
        serializer = TournamentSerializer(tournaments, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="대회별 경기결과 상세 조회", tags=["대회별 경기결과"])
    def retrieve(self, request, *args, **kwargs):
        tournament = self.get_object()
        serializer = GameResultSerializer(tournament)

        return Response(serializer.data, status=status.HTTP_200_OK)
