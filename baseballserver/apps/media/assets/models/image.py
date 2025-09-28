from django.conf import settings
from django.db import models

from apps.media.storage.api import StoredFile
from .managers import ImagesManager


class SNUBaseballImage(models.Model):
    file = models.OneToOneField(
        StoredFile, primary_key=True, on_delete=models.CASCADE, related_name="image"
    )
    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="uploaded_images",
    )

    objects = ImagesManager()

    class Meta:
        db_table = "images"
        ordering = ["-file__created_at"]
        indexes = [
            models.Index(fields=["uploaded_by"]),
        ]

    def __str__(self):
        return self.file.key

    @property
    def type(self):
        return "IMAGE"

    @property
    def url(self):
        return self.file.url
