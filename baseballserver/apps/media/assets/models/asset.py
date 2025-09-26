from django.conf import settings
from django.db import models

from apps.media.storage.api import StoredFile
from .managers import AssetsManager


class SNUBaseballAsset(models.Model):
    file = models.OneToOneField(
        StoredFile, primary_key=True, on_delete=models.CASCADE, related_name="asset"
    )
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="uploaded_assets",
    )

    objects = AssetsManager()

    class Meta:
        db_table = "assets"
        ordering = ["-file__created_at"]
        indexes = [
            models.Index(fields=["uploaded_by"]),
        ]

    @property
    def type(self):
        return "ASSET"
