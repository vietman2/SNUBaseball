from django.contrib import admin
## Models to unregister
from django.contrib.auth.models import Group
from allauth.account.models import EmailAddress
from rest_framework.authtoken.models import TokenProxy
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

## Models to register
from board.notice.models import (
    Notice, NoticeCategory, NoticeAttachment, NoticeComment, NoticeLike, NoticeContentView
)

from person.major.models import College, Department
from person.member.models import Member
from person.tale.models import PlayerTale
from person.user.forms import UserAdmin
from person.user.models import User

admin.site.register(Notice)
admin.site.register(NoticeCategory)
admin.site.register(NoticeAttachment)
admin.site.register(NoticeComment)
admin.site.register(NoticeLike)
admin.site.register(NoticeContentView)

admin.site.register(College)
admin.site.register(Department)
admin.site.register(Member)
admin.site.register(PlayerTale)
admin.site.register(User, UserAdmin)

unnecessary_models = [Group, EmailAddress, TokenProxy, OutstandingToken, BlacklistedToken]

for model in unnecessary_models:
    admin.site.unregister(model)
