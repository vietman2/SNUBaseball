from django.contrib.auth.base_user import BaseUserManager

from member.person.models import Member


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
