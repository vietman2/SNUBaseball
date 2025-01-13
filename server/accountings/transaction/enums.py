from django.db import models

class TransactionType(models.IntegerChoices):
    INCOME  = 1, "수입"
    OUTCOME = 2, "지출"

class TransactionCategory(models.IntegerChoices):
    FOOD           = 1, "식비"
    TRANSPORTATION = 2, "교통비"
    ACCOMMODATION  = 3, "숙박비"
    SUPPLIES       = 4, "훈련용품비"
    OTHER          = 9, "기타"

class TransactionMethod(models.IntegerChoices):
    CARD        = 1, "카드"
    TRANSFER    = 2, "계좌이체"
    OTHER       = 9, "기타"
