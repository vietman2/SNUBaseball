from django.contrib.auth.base_user import BaseUserManager
from django.utils import timezone

from person.member.models import Member

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
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        member = Member.objects.create(
            student_id="2017-19331",
            first_name="승원",
            last_name="정",
            birth_date="1999-03-07",
            admission_year=2017,
        )

        return self.create_user(password, member=member, **extra_fields)
