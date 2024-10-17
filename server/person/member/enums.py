from django.db import models

class RoleType(models.IntegerChoices):
    UNDEFINED       = 0, "미분류"
    PLAYER          = 1, "선수"
    MANAGER         = 2, "매니저"
    MENTOR          = 3, "지도자"
    CAPTAIN         = 4, "주장"
    VICE_CAPTAIN    = 5, "부주장"
    OTHER           = 9, "기타"

class StatusType(models.IntegerChoices):
    UNDEFINED   = 0, "미분류"
    ACTIVE      = 1, "활동"
    INACTIVE    = 2, "비활동"
    GRADUATED   = 3, "졸업"
    OTHER       = 9, "기타"

class HandsType(models.IntegerChoices):
    UNDEFINED   = 0, "미분류"
    RR          = 1, "우투우타"
    RL          = 2, "우투좌타"
    LR          = 3, "좌투우타"
    LL          = 4, "좌투좌타"
    BR          = 5, "양투우타"
    BL          = 6, "양투좌타"
    RB          = 7, "우투양타"
    LB          = 8, "좌투양타"
    BB          = 9, "양투양타"
