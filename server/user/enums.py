from django.db import models

class RoleType(models.IntegerChoices):
    UNDEFINED   = 0, "미분류"
    PLAYER      = 1, "선수"
    MANAGER     = 2, "매니저"
    MENTOR      = 3, "지도자"
    OTHER       = 9, "기타"

class StatusType(models.IntegerChoices):
    UNDEFINED   = 0, "미분류"
    ACTIVE      = 1, "활동"
    INACTIVE    = 2, "비활동"
    GRADUATED   = 3, "졸업"
    OTHER       = 9, "기타"
