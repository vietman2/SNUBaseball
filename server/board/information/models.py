from django.db import models

from core.models import Post

class Information(Post):
    pin = models.BooleanField(default=False)

    class Meta:
        db_table = 'information'
