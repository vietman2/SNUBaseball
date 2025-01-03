from django.db import models

from .ballpark import Ballpark
from .enums import PositionChoices
from .player import MyPlayer
from .team import Opponent
from .tournament import TournamentEvent

class Game(models.Model):
    tournament_event = models.ForeignKey(
        TournamentEvent, on_delete=models.CASCADE, related_name='results'
    )
    opponent         = models.ForeignKey(Opponent, on_delete=models.CASCADE)
    location         = models.ForeignKey(Ballpark, on_delete=models.CASCADE)
    date_time        = models.DateTimeField()
    youtube_videoid  = models.CharField(max_length=50, blank=True)
    is_home          = models.BooleanField()
    is_finished      = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self):
        return f"{self.opponent}전"

    class Meta:
        db_table = 'game'
        verbose_name = '경기'
        verbose_name_plural = '경기'

class MyGamePlayer(models.Model):
    game            = models.ForeignKey(
        Game, on_delete=models.CASCADE, related_name='game_players'
    )
    player          = models.ForeignKey(
        MyPlayer, on_delete=models.CASCADE, related_name='game_players'
    )
    position        = models.IntegerField(
        choices=PositionChoices.choices, default=PositionChoices.UNDEFINED
    )

    objects = models.Manager()

    def __str__(self):
        return f"{self.player} ({self.game})"

    class Meta:
        db_table = 'game_player'
        verbose_name = '선수 (경기)'
        verbose_name_plural = '선수 (경기)'
        unique_together = ('game', 'player')

class GameLineup(models.Model):
    game            = models.OneToOneField(
        Game, on_delete=models.CASCADE, related_name='game_lineups'
    )
    starting_pitcher= models.ForeignKey(
        MyGamePlayer, on_delete=models.CASCADE, related_name='starting_pitcher'
    )
    one             = models.ForeignKey(
        MyGamePlayer, on_delete=models.CASCADE, related_name='one'
    )
    two             = models.ForeignKey(
        MyGamePlayer, on_delete=models.CASCADE, related_name='two'
    )
    three           = models.ForeignKey(
        MyGamePlayer, on_delete=models.CASCADE, related_name='three'
    )
    four            = models.ForeignKey(
        MyGamePlayer, on_delete=models.CASCADE, related_name='four'
    )
    five            = models.ForeignKey(
        MyGamePlayer, on_delete=models.CASCADE, related_name='five'
    )
    six             = models.ForeignKey(
        MyGamePlayer, on_delete=models.CASCADE, related_name='six'
    )
    seven           = models.ForeignKey(
        MyGamePlayer, on_delete=models.CASCADE, related_name='seven'
    )
    eight           = models.ForeignKey(
        MyGamePlayer, on_delete=models.CASCADE, related_name='eight'
    )
    nine            = models.ForeignKey(
        MyGamePlayer, on_delete=models.CASCADE, related_name='nine'
    )
    bench           = models.ManyToManyField(MyGamePlayer, related_name='bench')
    managers        = models.ManyToManyField(MyGamePlayer, related_name='managers')

    objects = models.Manager()

    class Meta:
        db_table = 'game_lineup'
        verbose_name = '라인업'
        verbose_name_plural = '라인업'
