from django.conf import settings
from django.db import models

from core.models import TimeStampedModel


class SNUBaseballAsset(TimeStampedModel):
    key = models.CharField(max_length=512, unique=True, db_index=True)
    original_filename = models.CharField(max_length=255, blank=True)  # optional
    mime = models.CharField(max_length=100, blank=True)  # optional
    size = models.PositiveBigIntegerField(null=True, blank=True)  # optional
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL
    )

    objects = models.Manager()

    class Meta:
        db_table = "assets"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["uploaded_by"]),
        ]

    def __str__(self):
        return f"{self.key}"

    @property
    def url(self):
        return f"{settings.MEDIA_CDN_BASE_URL}/{self.key}"
