from django.contrib import admin
## Models to unregister
from django.contrib.auth.models import Group
from allauth.account.models import EmailAddress
from rest_framework.authtoken.models import TokenProxy
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

## Models to register
from board.discussion.models import (
    Discussion, DiscussionAttachment, DiscussionComment, DiscussionLike, DiscussionContentView
)
from board.notice.models import (
    Notice, NoticeCategory, NoticeAttachment, NoticeComment, NoticeLike, NoticeContentView
)

from management.equipment.models import Equipment, EquipmentCategory, EquipmentUpdateHistory

from person.major.models import College, Department
from person.member.models import Member
from person.tale.models import PlayerTale
from person.user.forms import UserAdmin
from person.user.models import User

from training.feedback.models import (
    Feedback, FeedbackCategory, FeedbackComment, FeedbackContentView
)
from training.guideline.models import (
    Guideline, GuidelineCategory, GuidelineComment, GuidelineLike, GuidelineContentView
)

admin.site.register(Discussion)
admin.site.register(DiscussionAttachment)
admin.site.register(DiscussionComment)
admin.site.register(DiscussionLike)
admin.site.register(DiscussionContentView)
admin.site.register(Notice)
admin.site.register(NoticeCategory)
admin.site.register(NoticeAttachment)
admin.site.register(NoticeComment)
admin.site.register(NoticeLike)
admin.site.register(NoticeContentView)

admin.site.register(Equipment)
admin.site.register(EquipmentCategory)
admin.site.register(EquipmentUpdateHistory)

admin.site.register(College)
admin.site.register(Department)
admin.site.register(Member)
admin.site.register(PlayerTale)
admin.site.register(User, UserAdmin)

admin.site.register(Feedback)
admin.site.register(FeedbackCategory)
admin.site.register(FeedbackComment)
admin.site.register(FeedbackContentView)
admin.site.register(Guideline)
admin.site.register(GuidelineCategory)
admin.site.register(GuidelineComment)
admin.site.register(GuidelineLike)
admin.site.register(GuidelineContentView)

unnecessary_models = [Group, EmailAddress, TokenProxy, OutstandingToken, BlacklistedToken]

for model in unnecessary_models:
    admin.site.unregister(model)
