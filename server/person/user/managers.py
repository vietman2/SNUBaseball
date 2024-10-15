from django.contrib.auth.base_user import BaseUserManager
from django.utils import timezone

class UserManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset()

    def delete_user(self, user):
        user.is_active = False
        user.deleted_at = timezone.now()
        user.save(using=self._db)

        return user

    def create_user(self, password=None, **extra_fields):
        user = self.model(
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, password=None, **extra_fields):
        user = self.create_user(
            password=password,
            **extra_fields
        )
        user.is_superuser = True

        user.save(using=self._db)

        return user
