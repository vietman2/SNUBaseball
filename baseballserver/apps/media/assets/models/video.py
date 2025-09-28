from django.conf import settings
from django.db import models

from apps.media.storage.api import StoredFile
from .managers import VideosManager


class SNUBaseballVideo(models.Model):
    file = models.OneToOneField(
        StoredFile, primary_key=True, on_delete=models.CASCADE, related_name="video"
    )
    duration = models.PositiveIntegerField(null=True, blank=True)
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="uploaded_videos",
    )

    objects = VideosManager()

    class Meta:
        db_table = "videos"
        ordering = ["-file__created_at"]
        indexes = [
            models.Index(fields=["uploaded_by"]),
        ]

    def __str__(self):
        return self.file.key

    @property
    def type(self):
        return "VIDEO"

    @property
    def url(self):
        return self.file.url
