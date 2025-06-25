from django.db import models


class HandsType(models.IntegerChoices):
    UNDEFINED = 0, ""
    RR = 1, "우투우타"
    RL = 2, "우투좌타"
    LR = 3, "좌투우타"
    LL = 4, "좌투좌타"
    BR = 5, "양투우타"
    BL = 6, "양투좌타"
    RB = 7, "우투양타"
    LB = 8, "좌투양타"
    BB = 9, "양투양타"
