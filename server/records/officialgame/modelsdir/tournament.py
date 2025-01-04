from django.db import models

class Tournament(models.Model):
    name        = models.CharField(max_length=255)

    class Meta:
        db_table = 'tournament'
        verbose_name = '대회명'
        verbose_name_plural = '대회명'

class TournamentEvent(models.Model):
    tournament  = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    name        = models.CharField(max_length=255)
    year        = models.IntegerField()

    def __str__(self):
        return f"{self.year} {self.name}"

    class Meta:
        db_table = 'tournament_event'
        verbose_name = '대회'
        verbose_name_plural = '대회'
