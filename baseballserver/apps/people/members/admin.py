from django.contrib import admin

from .models import College, Department, Member, MemberRole, MemberStatus

admin.site.register(College)
admin.site.register(Department)
admin.site.register(Member)
admin.site.register(MemberRole)
admin.site.register(MemberStatus)
