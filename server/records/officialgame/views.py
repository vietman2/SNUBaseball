from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from person.member.models import Member
from person.member.serializers import MemberMiniSerializer
from .modelsdir.game import Game
from .modelsdir.player import MyPlayer
from .modelsdir.team import MyTeam
from .modelsdir.tournament import TournamentEvent
from .serializers import (
    TournamentSerializer, GameResultSerializer, TeamSerializer, TeamMembersSerialzier
)

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

class TeamView(ModelViewSet):
    queryset = MyTeam.objects.all()
    serializer_class = TeamSerializer
    http_method_names = ['get', 'post']

    def get_permissions(self):
        return [IsAuthenticated(),]

    @extend_schema(summary="팀 정보 목록 조회", tags=["팀 정보"])
    def list(self, request, *args, **kwargs):
        year = request.query_params.get('year', None)

        if year is None:
            ## only return list of years
            teams = MyTeam.objects.all()
            serializer = TeamSerializer(teams, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        if not year.isdigit():
            return Response({
                'message': '잘못된 요청입니다.'
            }, status=status.HTTP_400_BAD_REQUEST)

        team = MyTeam.objects.filter(year=year).first()
        if team is None:
            return Response({
                'message': '해당 연도의 팀 정보가 없습니다.'
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = TeamMembersSerialzier(team)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @extend_schema(summary="팀 등록 가능 선수 조회", tags=["팀 정보"])
    @action(detail=False, methods=['get'])
    def players(self, request, *args, **kwargs):
        year = request.query_params.get('year', None)

        if year is None:
            return Response({
                'message': '잘못된 요청입니다.'
            }, status=status.HTTP_400_BAD_REQUEST)

        team = MyTeam.objects.filter(year=year).first()

        if team is None:
            return Response({
                'message': '해당 연도의 팀 정보가 없습니다.'
            }, status=status.HTTP_404_NOT_FOUND)

        existing_members = team.myplayer_set.all().values_list('member', flat=True)

        members = Member.objects.all().exclude(id__in=existing_members)

        serializer = MemberMiniSerializer(members, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="팀 선수 추가", tags=["팀 정보"])
    @action(detail=False, methods=['post'])
    def player(self, request, *args, **kwargs):
        year = request.data.get('year', None)
        member_id = request.data.get('member_id', None)
        role = request.data.get('role', None)
        back_number = request.data.get('back_number', None)
        is_registered = request.data.get('is_registered', False)

        if year is None or member_id is None or role is None or back_number is None:
            return Response({
                'message': '잘못된 요청입니다.'
            }, status=status.HTTP_400_BAD_REQUEST)

        team = MyTeam.objects.filter(year=year).first()
        member = Member.objects.filter(id=member_id).first()

        if team is None or member is None:
            return Response({
                'message': '정보가 없습니다.'
            }, status=status.HTTP_404_NOT_FOUND)

        player = MyPlayer.objects.create(
            member=member,
            team=team,
            back_number=back_number,
            is_registered=is_registered,
        )

        if role == "지도자":
            player.is_staff = True
        elif role == "매니저":
            player.is_manager = True
        elif role == "주장":
            player.is_captain = True
        elif role == "부주장":
            player.is_vice_captain = True
        elif role == "수석매니저":
            player.is_head_manager = True
            player.is_manager = True

        player.save()

        return Response(data={'message': '선수 등록 완료'}, status=status.HTTP_201_CREATED)
