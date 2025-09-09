from django.db import models

from member.role.models import MemberRole
from member.status.models import MemberStatus


class MemberManager(models.Manager):
    def active_members(self):
        active_status = MemberStatus.objects.get(pk=1)
        student_roles = MemberRole.objects.filter(pk__in=[1, 2, 3, 4, 5])

        return self.filter(status=active_status, role__in=student_roles)

    def active_players(self):
        active_status = MemberStatus.objects.get(pk=1)
        player_roles = MemberRole.objects.filter(pk__in=[1, 2, 5])

        return self.filter(status=active_status, role__in=player_roles)

    def active_managers(self):
        active_status = MemberStatus.objects.get(pk=1)
        manager_roles = MemberRole.objects.filter(pk__in=[3, 4])

        return self.filter(status=active_status, role__in=manager_roles)
