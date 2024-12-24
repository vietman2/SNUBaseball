from django.db import models

from person.member.models import Member
from .enums import LocationChoices

class EquipmentCategory(models.Model):
    name                = models.CharField(max_length=20)
    person_in_charge    = models.ManyToManyField(Member, related_name='equipment_categories')
    management_tips     = models.TextField(default='')

    class Meta:
        db_table = 'equipment_category'

class Equipment(models.Model):
    category    = models.ForeignKey(
        EquipmentCategory,
        on_delete=models.CASCADE,
        related_name='equipment_set'
    )
    name        = models.CharField(max_length=100)
    quantity    = models.IntegerField()
    unit        = models.CharField(max_length=20, default='개')
    location    = models.IntegerField(choices=LocationChoices.choices)

    class Meta:
        db_table = 'equipment'
        unique_together = ['location', 'name']

class EquipmentUpdateHistory(models.Model):
    category    = models.ForeignKey(
        EquipmentCategory, on_delete=models.CASCADE, related_name='equipment_update_history'
    )
    person      = models.ForeignKey(Member, on_delete=models.CASCADE)
    summary     = models.CharField(max_length=20)
    details     = models.CharField(max_length=100)
    notes       = models.CharField(default='', max_length=100)
    updated_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'equipment_update_history'
        ordering = ['-updated_at']
