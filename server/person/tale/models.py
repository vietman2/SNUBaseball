from django.core.validators import MinValueValidator as Min, MaxValueValidator as Max
from django.db import models

from person.member.models import Member

class PlayerTale(models.Model):
    member          = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='tales')
    year            = models.IntegerField(validators=[Min(1950), Max(2100)])

    weight          = models.IntegerField(default=0)
    height          = models.IntegerField(default=0)

    reason          = models.TextField(default="")
    goal            = models.TextField(default="")
    rival           = models.CharField(default="", max_length=20)
    role_model      = models.TextField(default="", max_length=20)
    strength        = models.TextField(default="", max_length=50)
    weakness        = models.TextField(default="", max_length=50)

    objects = models.Manager()

    class Meta:
        db_table = 'tale'
        unique_together = ['member', 'year']
