import uuid
from django.contrib.auth.models import AbstractBaseUser
from django.db import models

from auth.member.models import Member


class User(AbstractBaseUser):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=150, unique=True)
    member = models.OneToOneField(Member, on_delete=models.CASCADE, related_name="user")

    joined_at = models.DateTimeField(auto_now_add=True)

    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "username"

    objects = models.Manager()

    def has_perm(self, perm, obj=None):  # pylint: disable=unused-argument
        return True

    def has_module_perms(self, app_label):  # pylint: disable=unused-argument
        return True

    class Meta:
        db_table = "user"
        verbose_name = "유저"
        verbose_name_plural = "유저"
