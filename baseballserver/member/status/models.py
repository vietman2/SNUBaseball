from django.db import models

from core.models import Chip


class MemberStatus(Chip):
    name = models.CharField(max_length=20, unique=True)

    objects = models.Manager()

    class Meta:
        db_table = "member_status"
        verbose_name = "부원 활동 상태"
        verbose_name_plural = "부원 활동 상태"

    def __str__(self):
        return f"{self.name}"
