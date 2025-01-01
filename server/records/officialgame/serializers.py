from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .modelsdir.game import Game
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
