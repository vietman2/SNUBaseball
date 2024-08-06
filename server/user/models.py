import uuid
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from .managers import UserManager

class User(AbstractBaseUser):
    uuid            = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username        = models.CharField(max_length=150, unique=True)
    email           = models.EmailField(max_length=255, unique=True)
    phone           = PhoneNumberField(unique=True)

    first_name      = models.CharField(max_length=150, blank=True)
    last_name       = models.CharField(max_length=150, blank=True)

    is_active       = models.BooleanField(default=True)
    is_superuser    = models.BooleanField(default=False)

    joined_at       = models.DateTimeField(auto_now_add=True)
    deleted_at      = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD  = 'username'
    REQUIRED_FIELDS = ['email', 'phone']

    objects         = UserManager()

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        db_table    = 'user'
