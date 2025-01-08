from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from person.member.utils import get_profile_image_url
from .modelsdir.game import Game, GameLineup, MyGamePlayer
from .modelsdir.player import MyPlayer
from .modelsdir.team import MyTeam
from .modelsdir.tournament import TournamentEvent

class ResultSerializer(ModelSerializer):
    ## 경기결과 (Simple)을 위한 Serializer
    date_time   = serializers.DateTimeField(format="%m월 %d일 %H:%M")
    location    = serializers.CharField(source='location.short_name')
    home_team   = serializers.SerializerMethodField()
    away_team   = serializers.SerializerMethodField()
    result      = serializers.SerializerMethodField()
    home_score  = serializers.SerializerMethodField()
    away_score  = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = [
            'id', 'date_time', 'location', 'home_team', 'away_team',
            'is_home', 'result', 'home_score', 'away_score', 'is_finished'
        ]

    def get_home_team(self, obj):
        if obj.is_home:
            return "서울대"

        return obj.opponent.name

    def get_away_team(self, obj):
        if obj.is_home:
            return obj.opponent.name

        return "서울대"

    def get_result(self, obj):
        return "패"

    def get_home_score(self, obj):
        return 0

    def get_away_score(self, obj):
        return 0

class TournamentSerializer(ModelSerializer):
    results     = ResultSerializer(many=True)

    class Meta:
        model = TournamentEvent
        fields = ['id', 'name', 'results']

class LineupPlayerSerializer(ModelSerializer):
    name                = serializers.CharField(source='player.member.full_name')
    position            = serializers.CharField(source='get_position_display')
    back_number         = serializers.CharField(source='player.back_number')
    profile_position    = serializers.CharField(source='player.member.position')

    class Meta:
        model = MyGamePlayer
        fields = ['name', 'position', 'back_number', 'profile_position']

class LineupSerializer(ModelSerializer):
    ## 선발라인업을 위한 Serializer
    starting_pitcher = LineupPlayerSerializer()
    order            = serializers.SerializerMethodField()
    bench            = LineupPlayerSerializer(many=True)
    managers         = LineupPlayerSerializer(many=True)

    class Meta:
        model = GameLineup
        fields = [
            'starting_pitcher', 'order', 'bench', 'managers'
        ]

    def get_order(self, obj):
        ## first~nineth in list
        order = []
        order.append(obj.one)
        order.append(obj.two)
        order.append(obj.three)
        order.append(obj.four)
        order.append(obj.five)
        order.append(obj.six)
        order.append(obj.seven)
        order.append(obj.eight)
        order.append(obj.nine)

        return LineupPlayerSerializer(order, many=True).data

class GameResultSerializer(ModelSerializer):
    lineup = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = ['id', 'youtube_videoid', 'lineup']

    def get_lineup(self, obj):
        lineup = GameLineup.objects.filter(game=obj).first()
        if lineup is None:
            return None
        return LineupSerializer(lineup).data

class PlayerSerializer(ModelSerializer):
    name            = serializers.CharField(source='member.full_name')
    back_number     = serializers.SerializerMethodField()
    position        = serializers.SerializerMethodField()
    profile_image   = serializers.SerializerMethodField()

    class Meta:
        model = MyPlayer
        fields = ['id', 'name', 'position', 'back_number', 'weight', 'height', 'profile_image']

    def get_back_number(self, obj):
        if obj.back_number == 0:
            return ""
        return obj.back_number

    def get_position(self, obj):
        return obj.member.position

    def get_profile_image(self, obj):
        return get_profile_image_url(obj.member.profile_image)

class StaffSerializer(ModelSerializer):
    name            = serializers.CharField(source='member.full_name')
    back_number     = serializers.SerializerMethodField()
    role            = serializers.SerializerMethodField()
    profile_image   = serializers.SerializerMethodField()

    class Meta:
        model = MyPlayer
        fields = ['id', 'name', 'back_number', 'role', 'profile_image']

    def get_back_number(self, obj):
        if obj.back_number == 0:
            return ""
        return obj.back_number

    def get_role(self, obj):
        if obj.is_staff:
            return "지도자"

        return "매니저"

    def get_profile_image(self, obj):
        return get_profile_image_url(obj.member.profile_image)

class TeamSerializer(ModelSerializer):
    professor   = serializers.SerializerMethodField()
    head_coach  = serializers.SerializerMethodField()
    num_managers= serializers.SerializerMethodField()
    num_players = serializers.SerializerMethodField()
    games       = serializers.SerializerMethodField()
    wins        = serializers.SerializerMethodField()
    losses      = serializers.SerializerMethodField()
    ties        = serializers.SerializerMethodField()

    class Meta:
        model = MyTeam
        fields = [
            'year', 'num_managers', 'num_players', 'professor', 'head_coach',
            'head_manager', 'captain', 'vice_captain', 'games', 'wins', 'losses', 'ties'
        ]

    def get_professor(self, obj):
        return f"{obj.professor} 교수님"

    def get_head_coach(self, obj):
        if obj.head_coach == "-":
            return "-"
        return f"{obj.head_coach} 감독님"

    def get_num_managers(self, obj):
        return obj.myplayer_set.filter(is_manager=True).count()

    def get_num_players(self, obj):
        return obj.myplayer_set.filter(is_staff=False, is_manager=False).count()

    def get_games(self, obj):
        return 10

    def get_wins(self, obj):
        return 0

    def get_losses(self, obj):
        return 10

    def get_ties(self, obj):
        return 0

class TeamMembersSerialzier(ModelSerializer):
    staff       = serializers.SerializerMethodField()
    managers    = serializers.SerializerMethodField()
    players     = serializers.SerializerMethodField()

    class Meta:
        model = MyTeam
        fields = ['staff', 'managers', 'players']

    def get_staff(self, obj):
        staff = obj.myplayer_set.filter(is_staff=True)
        return StaffSerializer(staff, many=True).data

    def get_managers(self, obj):
        managers = obj.myplayer_set.filter(is_manager=True)
        return StaffSerializer(managers, many=True).data

    def get_players(self, obj):
        players = obj.myplayer_set.filter(is_staff=False, is_manager=False)
        players = players.order_by('back_number')
        return PlayerSerializer(players, many=True).data
