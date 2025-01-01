from django.db import models

class Tournament(models.Model):
    name        = models.CharField(max_length=255)

    class Meta:
        db_table = 'tournament'

class TournamentEvent(models.Model):
    tournament  = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    name        = models.CharField(max_length=255)
    year        = models.IntegerField()

    class Meta:
        db_table = 'tournament_event'
