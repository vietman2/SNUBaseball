from django.db import models

from core.models import TimeStampedModel

class Image(TimeStampedModel):
    title       = models.CharField(max_length=40)
    image       = models.ImageField()

    class Meta:
        db_table = 'image'
