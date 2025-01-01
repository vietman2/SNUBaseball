from django.db import models

class MyTeam(models.Model):
    year = models.IntegerField()

    class Meta:
        db_table = 'my_team'

class Opponent(models.Model):
    year = models.IntegerField()
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'opponent'
