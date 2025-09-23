from django.db import models

from .enums import SemesterChoices


class TeamRoster(models.Model):
    year = models.IntegerField()
    semester = models.IntegerField(choices=SemesterChoices.choices)

    objects = models.Manager()

    class Meta:
        db_table = "teams"
        verbose_name = "팀"
        verbose_name_plural = "팀"
        unique_together = ("year", "semester")
        ordering = ["-year", "semester"]

    def __str__(self):
        return f"{self.year} {self.semester}학기"

    @property
    def team_code(self):
        return f"{self.year}-{self.semester}"
