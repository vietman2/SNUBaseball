from django.db import models

class LocationChoices(models.IntegerChoices):
    ACADEMY_STORAGE = 1, "아카데미"
    OUTER_STORAGE   = 2, "창고"
    LOCKER          = 3, "부실"
    OTHER           = 4, "기타"
