from django.core.exceptions import ValidationError
from django.db import models

from .asset import SNUBaseballAsset


class SNUBaseballVideo(SNUBaseballAsset):
    duration = models.PositiveIntegerField(null=True, blank=True)

    objects = models.Manager()

    class Meta:
        db_table = "videos"

    def clean(self):
        if self.mime and not self.mime.startswith("video/"):
            raise ValidationError("Video MIME type expected")
