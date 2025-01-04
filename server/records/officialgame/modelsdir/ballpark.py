from django.db import models

class Ballpark(models.Model):
    name        = models.CharField(max_length=255)
    short_name  = models.CharField(max_length=255)

    class Meta:
        db_table = 'ballpark'
        verbose_name = '야구장'
        verbose_name_plural = '야구장'
