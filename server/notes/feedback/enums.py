from django.db import models

class StatusType(models.IntegerChoices):
    NEW             = 0, "신규"
    IN_PROGRESS     = 1, "진행중"
    UNDER_REVIEW    = 2, "검토중"
    DONE            = 3, "완료"
