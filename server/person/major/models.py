from django.db import models

class College(models.Model):
    name        = models.CharField(max_length=150, unique=True)
    short_name  = models.CharField(max_length=50, unique=True)

    objects     = models.Manager()

    class Meta:
        db_table = 'college'

class Department(models.Model):
    name        = models.CharField(max_length=150, unique=True)
    short_name  = models.CharField(max_length=50, unique=True)
    college     = models.ForeignKey(College, on_delete=models.CASCADE)

    objects     = models.Manager()

    class Meta:
        db_table = 'department'
