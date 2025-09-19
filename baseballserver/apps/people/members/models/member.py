from django.core.validators import MinValueValidator as Min, MaxValueValidator as Max
from django.db import models

from apps.media.assets.api import SNUBaseballImage
from .managers import MemberManager
from .major import Department
from .role import MemberRole
from .status import MemberStatus


class Member(models.Model):
    ## 기본 정보
    student_id = models.CharField(max_length=15, unique=True, blank=True)
    name = models.CharField(max_length=150)
    admission_year = models.IntegerField(validators=[Min(1900), Max(2100)])
    major = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True, blank=True
    )

    ## 추가 프로필
    birth_date = models.DateField(null=True, blank=True)
    profile_image = models.ForeignKey(
        SNUBaseballImage,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="members",
    )
    date_joined = models.DateField(null=True, blank=True)  ## 야구부 입부일

    ## 연락처
    phone = models.CharField(max_length=15, unique=True, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True)
    address = models.TextField(default="", blank=True)

    ## 기타 정보
    notes = models.TextField(default="", blank=True)  ## 관리자 / 주장단 전용 메모

    ## 현재 상태
    role = models.ForeignKey(
        MemberRole, on_delete=models.PROTECT, related_name="members"
    )
    status = models.ForeignKey(
        MemberStatus, on_delete=models.PROTECT, related_name="members"
    )

    objects = MemberManager()

    def __str__(self):
        return f"{self.name} ({self.admission_year})"

    class Meta:
        db_table = "member"
        verbose_name = "부원"
        verbose_name_plural = "부원"
        ordering = ["admission_year"]
