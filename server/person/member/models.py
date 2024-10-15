from django.core.validators import MinValueValidator as Min, MaxValueValidator as Max
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from person.major.models import Department
from .enums import RoleType, StatusType

class Member(models.Model):
    student_id      = models.CharField(max_length=10, unique=True, null=True, blank=True)
    first_name      = models.CharField(max_length=150)
    last_name       = models.CharField(max_length=150)
    birth_date      = models.DateField(null=True, blank=True)
    admission_year  = models.IntegerField(validators=[Min(1900), Max(2100)])
    major           = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    role            = models.IntegerField(choices=RoleType.choices, default=RoleType.UNDEFINED)
    status          = models.IntegerField(choices=StatusType.choices, default=StatusType.UNDEFINED)

    phone           = PhoneNumberField(unique=True, null=True, blank=True)
    email           = models.EmailField(max_length=255, unique=True, null=True, blank=True)
    address         = models.TextField(default="")
    notes           = models.TextField(default="")
    date_joined     = models.DateField(null=True, blank=True)

    objects         = models.Manager()

    @property
    def full_name(self):
        return f'{self.last_name}{self.first_name}'

    class Meta:
        db_table    = 'member'
