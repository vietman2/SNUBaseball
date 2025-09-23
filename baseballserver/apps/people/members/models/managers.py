from django.db import models

from .role import MemberRole
from .status import MemberStatus


class MemberManager(models.Manager):
    def active_students(self):
        active_status = MemberStatus.objects.get(pk=1)
        student_roles = MemberRole.objects.filter(is_staff=False)

        return self.filter(status=active_status, role__in=student_roles)

    def active_players(self):
        active_status = MemberStatus.objects.get(pk=1)
        player_roles = MemberRole.objects.filter(is_player=True)

        return self.filter(status=active_status, role__in=player_roles)

    def active_managers(self):
        active_status = MemberStatus.objects.get(pk=1)
        manager_roles = MemberRole.objects.filter(is_manager=True)

        return self.filter(status=active_status, role__in=manager_roles)
