from django.db import models

from core.models import TimeStampedModel


class Album(TimeStampedModel):
    title = models.CharField(max_length=255)
    members_only = models.BooleanField(default=False)

    objects = models.Manager()

    class Meta:
        db_table = "albums"
        verbose_name = "앨범"
        verbose_name_plural = "앨범"

    def __str__(self):
        return self.title
