from django.db import models

from core.models import Image

class Memory(Image):
    description = models.TextField(blank=True)

    objects     = models.Manager()

    class Meta:
        db_table = 'memory'
