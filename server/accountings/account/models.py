from django.db import models

from core.models import Chip
from .enums import AccountType

class Account(Chip):
    name            = models.CharField(max_length=20)
    cached_balance  = models.IntegerField(default=0)
    type            = models.IntegerField(
        choices=AccountType.choices, default=AccountType.OTHER
    )

    objects         = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'account'
        verbose_name = '계좌'
        verbose_name_plural = '계좌'
