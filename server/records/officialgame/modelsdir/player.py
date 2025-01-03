from django.db import models

from person.member.models import Member
from .team import MyTeam

class MyPlayer(models.Model):
    member      = models.ForeignKey(Member, on_delete=models.CASCADE)
    team        = models.ForeignKey(MyTeam, on_delete=models.CASCADE)

    weight      = models.IntegerField(default=0)
    height      = models.IntegerField(default=0)
    back_number = models.IntegerField(default=0)

    reason      = models.TextField(default="")
    goal        = models.TextField(default="")
    rival       = models.CharField(default="", max_length=20)
    role_model  = models.TextField(default="", max_length=20)
    strength    = models.TextField(default="", max_length=50)
    weakness    = models.TextField(default="", max_length=50)

    is_registered = models.BooleanField(default=False)

    objects = models.Manager()

    def __str__(self):
        return f"{str(self.team.year)[-2:]} {self.member.full_name}"

    class Meta:
        db_table = 'my_player'
        verbose_name = '팀원'
        verbose_name_plural = '팀원'
        unique_together = ('member', 'team')
