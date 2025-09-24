from django.db import models


class MediaTag(models.Model):
    name = models.CharField(max_length=20, unique=True)

    objects = models.Manager()

    class Meta:
        db_table = "media_tags"
        verbose_name = "미디어 태그"
        verbose_name_plural = "미디어 태그"

    def __str__(self):
        return self.name
