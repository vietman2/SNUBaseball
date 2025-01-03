from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .modelsdir.game import Game, GameLineup, MyGamePlayer
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
