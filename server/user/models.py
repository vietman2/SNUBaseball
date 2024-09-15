import uuid
from django.contrib.auth.models import AbstractBaseUser
from django.db import models

from .managers import UserManager
from .person import Person

class User(AbstractBaseUser):
    uuid            = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username        = models.CharField(max_length=150, unique=True)
    person          = models.OneToOneField(Person, on_delete=models.CASCADE)

    joined_at       = models.DateTimeField(auto_now_add=True)

    is_superuser    = models.BooleanField(default=False)
    is_blocked      = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)

    USERNAME_FIELD  = 'username'

    objects         = UserManager()

    class Meta:
        db_table    = 'user'
