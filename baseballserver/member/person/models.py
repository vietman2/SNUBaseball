from django.core.validators import MinValueValidator as Min, MaxValueValidator as Max
from django.db import models

from media.image.models import SNUBaseballImage
from member.major.models import Department
from member.role.models import MemberRole
from member.status.models import MemberStatus
from .managers import MemberManager


class Member(models.Model):
    student_id = models.CharField(max_length=15, unique=True, blank=True)
    name = models.CharField(max_length=150)
    birth_date = models.DateField(null=True, blank=True)
    admission_year = models.IntegerField(validators=[Min(1900), Max(2100)])
    major = models.ForeignKey(
        Department, on_delete=models.SET_NULL, null=True, blank=True
    )

    phone = models.CharField(max_length=15, unique=True, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True)
    address = models.TextField(default="", blank=True)
    profile_image = models.ForeignKey(
        SNUBaseballImage,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="members",
    )
    notes = models.TextField(default="", blank=True)
    extras = models.JSONField(default=dict, blank=True)

    role = models.ForeignKey(
        MemberRole, on_delete=models.PROTECT, related_name="members"
    )
    status = models.ForeignKey(
        MemberStatus, on_delete=models.PROTECT, related_name="members"
    )

    date_joined = models.DateField(null=True, blank=True)
    num_semester = models.IntegerField(validators=[Min(0), Max(20)], default=0)

    objects = MemberManager()

    def __str__(self):
        return f"{self.name} ({self.admission_year})"

    class Meta:
        db_table = "member"
        verbose_name = "부원"
        verbose_name_plural = "부원"
        ordering = ["admission_year"]
