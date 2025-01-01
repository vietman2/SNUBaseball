from django.db import models

from .ballpark import Ballpark
from .team import Opponent
from .tournament import TournamentEvent

class Game(models.Model):
    tournament_event = models.ForeignKey(TournamentEvent, on_delete=models.CASCADE, related_name='results')
    opponent         = models.ForeignKey(Opponent, on_delete=models.CASCADE)
    location         = models.ForeignKey(Ballpark, on_delete=models.CASCADE)
    date_time        = models.DateTimeField()
    is_home          = models.BooleanField()
    is_finished      = models.BooleanField(default=False)

    class Meta:
        db_table = 'game'
