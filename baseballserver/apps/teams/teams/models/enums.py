from django.db import models


class SemesterChoices(models.IntegerChoices):
    FIRST = 1, "1학기"
    SECOND = 2, "2학기"


class HandsChoices(models.IntegerChoices):
    UNDEFINED = 0, "-"  ## 지도교수, 코치진, 매니저 등
    RR = 1, "우투우타"
    RL = 2, "우투좌타"
    RS = 3, "우투양타"
    LL = 4, "좌투좌타"
    LR = 5, "좌투우타"
    LS = 6, "좌투양타"
    SS = 7, "양투양타"
    SR = 8, "양투우타"
    SL = 9, "양투좌타"


class TeamRoleChoices(models.TextChoices):
    MANAGER = "MANAGER", "매니저"
    PLAYER = "PLAYER", "선수"
    PROFESSOR = "PROFESSOR", "지도교수"
    COACH = "COACH", "코치"
