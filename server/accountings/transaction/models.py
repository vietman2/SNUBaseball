from django.db import models

from accountings.account.models import Account
from .enums import TransactionCategory, TransactionMethod, TransactionType

class Transaction(models.Model):
    account             = models.ForeignKey(Account, on_delete=models.CASCADE)
    amount              = models.IntegerField()
    description         = models.CharField(max_length=100)
    type                = models.IntegerField(
        choices=TransactionType.choices, default=TransactionType.OUTCOME
    )
    category            = models.IntegerField(
        choices=TransactionCategory.choices, default=TransactionCategory.OTHER
    )
    method              = models.IntegerField(
        choices=TransactionMethod.choices, default=TransactionMethod.OTHER
    )
    counter_party       = models.CharField(max_length=20)
    balance_after       = models.IntegerField()
    notes               = models.TextField()
    date                = models.DateField()

    objects             = models.Manager()

    class Meta:
        db_table = 'transaction'
        ordering = ['-date', '-id']
        verbose_name = '거래'
        verbose_name_plural = '거래'
