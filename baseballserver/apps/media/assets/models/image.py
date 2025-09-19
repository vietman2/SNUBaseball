from django.core.exceptions import ValidationError
from django.db import models

from .asset import SNUBaseballAsset


class SNUBaseballImage(SNUBaseballAsset):
    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)

    objects = models.Manager()

    class Meta:
        db_table = "images"

    def clean(self):
        if self.mime and not self.mime.startswith("image/"):
            raise ValidationError("Image MIME type expected")
