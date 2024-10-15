import uuid
from django.contrib.auth.models import AbstractBaseUser
from django.db import models

from person.member.models import Member
from .managers import UserManager

class User(AbstractBaseUser):
    uuid            = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username        = models.CharField(max_length=150, unique=True)
    member          = models.OneToOneField(Member, on_delete=models.CASCADE, related_name='user')

    joined_at       = models.DateTimeField(auto_now_add=True)

    is_superuser    = models.BooleanField(default=False)
    is_blocked      = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)

    USERNAME_FIELD  = 'username'

    objects         = UserManager()

    class Meta:
        db_table    = 'user'
