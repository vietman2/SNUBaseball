from django.db import models

class AccountType(models.IntegerChoices):
    SUBSIDIES   = 1, "지원금"
    DONATION    = 2, "후원금"
    OTHER       = 9, "기타"
