from django.db import models


class MemberRole(models.Model):
    name = models.CharField(max_length=20, unique=True)

    is_leadership = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = models.Manager()

    class Meta:
        db_table = "member_role"
        verbose_name = "역할"
        verbose_name_plural = "역할"

    def __str__(self):
        return self.name
