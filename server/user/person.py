from django.core.validators import MinValueValidator as Min, MaxValueValidator as Max
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from .enums import RoleType, StatusType

class College(models.Model):
    name        = models.CharField(max_length=150, unique=True)
    short_name  = models.CharField(max_length=50, unique=True)

    objects     = models.Manager()

    class Meta:
        db_table = 'college'

class Department(models.Model):
    name        = models.CharField(max_length=150, unique=True)
    short_name  = models.CharField(max_length=50, unique=True)
    college     = models.ForeignKey(College, on_delete=models.CASCADE)

    objects     = models.Manager()

    class Meta:
        db_table = 'department'

class Person(models.Model):
    first_name      = models.CharField(max_length=150)
    last_name       = models.CharField(max_length=150)
    birth_date      = models.DateField(null=True, blank=True)
    admission_year  = models.IntegerField(validators=[Min(1900), Max(2100)])
    student_id      = models.CharField(max_length=10, unique=True, null=True, blank=True)
    major           = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    role            = models.IntegerField(choices=RoleType.choices, default=RoleType.UNDEFINED)
    status          = models.IntegerField(choices=StatusType.choices, default=StatusType.UNDEFINED)

    profile_image   = models.ImageField(null=True, blank=True)
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
        db_table    = 'person'
