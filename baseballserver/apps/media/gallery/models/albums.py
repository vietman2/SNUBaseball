from django.db import models

from core.models import TimeStampedModel


class Album(TimeStampedModel):
    title = models.CharField(max_length=255, unique=True)
    members_only = models.BooleanField(default=False)
    color = models.CharField(max_length=7, default="#FFFFFF")

    objects = models.Manager()

    class Meta:
        db_table = "albums"
        verbose_name = "앨범"
        verbose_name_plural = "앨범"

    def __str__(self):
        return self.title
