from django.core.validators import MinValueValidator as Min, MaxValueValidator as Max
from django.db import models

from apps.people.members.api import Member
from .enums import HandsChoices, TeamRoleChoices
from .roster import TeamRoster


class RosterMember(models.Model):
    """
    팀 로스터에 Specific한 정보
    """

    team = models.ForeignKey(
        TeamRoster, on_delete=models.CASCADE, related_name="roster_members"
    )
    member = models.ForeignKey(
        Member, on_delete=models.CASCADE, related_name="roster_members"
    )
    role = models.CharField(max_length=10, choices=TeamRoleChoices.choices)

    is_captain = models.BooleanField(default=False)
    is_vice_captain = models.BooleanField(default=False)
    is_head_manager = models.BooleanField(default=False)
    is_head_coach = models.BooleanField(default=False)

    position = models.CharField(default="", max_length=10, blank=True)
    hands = models.IntegerField(
        choices=HandsChoices.choices, default=HandsChoices.UNDEFINED
    )
    back_number = models.IntegerField(validators=[Min(0), Max(99)], default=0)
    height = models.IntegerField(validators=[Min(100), Max(250)], null=True, blank=True)
    weight = models.IntegerField(validators=[Min(30), Max(200)], null=True, blank=True)

    goal = models.CharField(max_length=100, blank=True, default="")

    objects = models.Manager()

    class Meta:
        db_table = "team_members"
        verbose_name = "팀 멤버"
        verbose_name_plural = "팀 멤버"
        unique_together = ("team", "member")

    def __str__(self):
        return f"{self.team.team_code} {self.member.name}"
