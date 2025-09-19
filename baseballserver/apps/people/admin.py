from django.contrib import admin

from .members.models import College, Department, Member, MemberRole, MemberStatus
from .users.models import User

admin.site.register(College)
admin.site.register(Department)
admin.site.register(Member)
admin.site.register(MemberRole)
admin.site.register(MemberStatus)

admin.site.register(User)
