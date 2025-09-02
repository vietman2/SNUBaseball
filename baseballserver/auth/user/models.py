import uuid
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.db.models.functions import Lower

from member.person.models import Member
from .managers import UserManager


class User(AbstractBaseUser):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=150, unique=True)
    member = models.OneToOneField(Member, on_delete=models.CASCADE, related_name="user")

    joined_at = models.DateTimeField(auto_now_add=True)

    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "username"

    objects = UserManager()

    @property
    def is_staff(self):
        return self.is_superuser

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    class Meta:
        db_table = "user"
        verbose_name = "유저"
        verbose_name_plural = "유저"
        constraints = [
            models.UniqueConstraint(Lower("username"), name="unique_lower_username")
        ]
