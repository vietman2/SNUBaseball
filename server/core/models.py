from django.db import models

class TimeStampedModel(models.Model):
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Image(TimeStampedModel):
    title       = models.CharField(max_length=40)
    file        = models.FileField()

    class Meta:
        abstract = True
