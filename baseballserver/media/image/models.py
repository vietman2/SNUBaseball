from django.db import models


class SNUBaseballImage(models.Model):
    key = models.CharField(max_length=255, unique=True)

    ## 메타데이터
    original_filename = models.CharField(max_length=255)
    mime = models.CharField(max_length=50)
    size = models.BigIntegerField()
    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    variants = models.JSONField(default=dict, blank=True)

    uploaded_by = models.ForeignKey(
        "user.User",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="images",
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()

    class Meta:
        db_table = "snu_baseball_image"
        ordering = ["-uploaded_at"]
        indexes = [
            models.Index(fields=["uploaded_by"]),
        ]

    def __str__(self):
        return f"{self.key}"
