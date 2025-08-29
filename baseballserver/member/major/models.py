from django.db import models


class College(models.Model):
    name = models.CharField(max_length=150, unique=True)
    short_name = models.CharField(max_length=50, unique=True)

    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "college"
        verbose_name = "대학"
        verbose_name_plural = "대학"


class Department(models.Model):
    name = models.CharField(max_length=150, unique=True)
    short_name = models.CharField(max_length=50, unique=True)
    college = models.ForeignKey(College, on_delete=models.CASCADE)

    objects = models.Manager()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "department"
        verbose_name = "학과"
        verbose_name_plural = "학과"
