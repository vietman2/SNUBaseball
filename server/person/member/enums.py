from django.db import models

class RoleType(models.IntegerChoices):
    UNDEFINED       = 0, "미분류"
    CAPTAIN         = 1, "주장"
    VICE_CAPTAIN    = 2, "부주장"
    HEAD_MANAGER    = 3, "수석매니저"
    MANAGER         = 4, "매니저"
    PLAYER          = 5, "선수"
    MENTOR          = 6, "지도자"
    OTHER           = 9, "기타"

class StatusType(models.IntegerChoices):
    UNDEFINED   = 0, "미분류"
    ACTIVE      = 1, "활동"
    INACTIVE    = 2, "비활동"
    MILITARY    = 3, "군입대"
    GRADUATED   = 4, "졸업"
    OTHER       = 9, "기타"

class HandsType(models.IntegerChoices):
    UNDEFINED   = 0, ""
    RR          = 1, "우투우타"
    RL          = 2, "우투좌타"
    LR          = 3, "좌투우타"
    LL          = 4, "좌투좌타"
    BR          = 5, "양투우타"
    BL          = 6, "양투좌타"
    RB          = 7, "우투양타"
    LB          = 8, "좌투양타"
    BB          = 9, "양투양타"
