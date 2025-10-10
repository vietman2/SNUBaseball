from django.conf import settings
from django.core.validators import MinLengthValidator as Min
from django.db import models

from core.models import TimeStampedModel


class StoredFile(TimeStampedModel):
    key = models.CharField(
        max_length=512, unique=True, db_index=True, validators=[Min(1)]
    )
    original_filename = models.CharField(max_length=255, blank=True)  # optional
    mime = models.CharField(max_length=100, blank=True)  # optional
    size = models.PositiveBigIntegerField(null=True, blank=True)  # optional

    objects = models.Manager()

    class Meta:
        db_table = "storage_files"
        verbose_name = "스토리지 파일"
        verbose_name_plural = "스토리지 파일"
        ordering = ["-id"]

    def __str__(self):
        return self.key

    @property
    def url(self):
        return f"{settings.MEDIA_CDN_BASE_URL}/{self.key}"
