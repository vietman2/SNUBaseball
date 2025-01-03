from django.db import models

class MyTeam(models.Model):
    year = models.IntegerField(unique=True)

    def __str__(self):
        return f"{str(self.year)[-2:]} 서울대"

    class Meta:
        db_table = 'my_team'
        verbose_name = '서울대 (팀)'
        verbose_name_plural = '서울대 (팀)'
        ordering = ['-year']

class Opponent(models.Model):
    year = models.IntegerField()
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{str(self.year)[-2:]} {self.name}"

    class Meta:
        db_table = 'opponent'
        verbose_name = '상대팀'
        verbose_name_plural = '상대팀'
