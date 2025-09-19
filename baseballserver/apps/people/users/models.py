import uuid
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.db.models.functions import Lower

from apps.people.members.api import Member


class UserManager(BaseUserManager):
    def create_user(self, password=None, **extra_fields):
        user = self.model(**extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, password=None, **extra_fields):
        """
        Create a superuser with the given password and extra fields.
        """
        extra_fields.setdefault("is_superuser", True)

        member = Member.objects.get(student_id="2017-19331")

        return self.create_user(password, member=member, **extra_fields)


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

    def has_perm(self, perm, obj=None):  ## pylint: disable=unused-argument
        return self.is_superuser

    def has_module_perms(self, app_label):  ## pylint: disable=unused-argument
        return self.is_superuser

    class Meta:
        db_table = "user"
        verbose_name = "유저"
        verbose_name_plural = "유저"
        constraints = [
            models.UniqueConstraint(Lower("username"), name="unique_lower_username")
        ]
