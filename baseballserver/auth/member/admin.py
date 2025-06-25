from django.contrib import admin

from .models import Member, MemberRole, MemberStatus

admin.site.register(Member)
admin.site.register(MemberRole)
admin.site.register(MemberStatus)
