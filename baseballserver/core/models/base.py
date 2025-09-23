from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Chip(models.Model):
    label = models.CharField(max_length=20)
    color = models.CharField(max_length=7, default="#FFFFFF")

    objects = models.Manager()

    class Meta:
        abstract = True
