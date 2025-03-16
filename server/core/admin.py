from django.contrib import admin
## Models to unregister
from django.contrib.auth.models import Group
from allauth.account.models import EmailAddress
from rest_framework.authtoken.models import TokenProxy
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

## Models to register
from accountings.account.models import Account
from accountings.transaction.models import Transaction

from archive.gallery.models import Album, Tag, BaseMedia, Image, Video

from board.discussion.models import (
    Discussion, DiscussionAttachment, DiscussionComment, DiscussionLike, DiscussionContentView
)
from board.notice.models import (
    Notice, NoticeCategory, NoticeAttachment, NoticeComment, NoticeLike, NoticeContentView
)

from management.equipment.models import Equipment, EquipmentCategory, EquipmentUpdateHistory
from management.minutes.models import Minutes, MinutesAttachment

from person.major.models import College, Department
from person.member.models import Member
from person.user.forms import UserAdmin
from person.user.models import User

from records.officialgame.modelsdir.ballpark import Ballpark
from records.officialgame.modelsdir.game import Game, MyGamePlayer, GameLineup
from records.officialgame.modelsdir.player import MyPlayer
from records.officialgame.modelsdir.team import MyTeam, Opponent
from records.officialgame.modelsdir.tournament import Tournament, TournamentEvent

from training.feedback.models import (
    Feedback, FeedbackCategory, FeedbackComment, FeedbackContentView
)
from training.guideline.models import (
    Guideline, GuidelineCategory, GuidelineComment, GuidelineLike, GuidelineContentView
)

admin.site.register(Account)
admin.site.register(Transaction)

admin.site.register(Album)
admin.site.register(Tag)
admin.site.register(BaseMedia)
admin.site.register(Image)
admin.site.register(Video)

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
admin.site.register(Minutes)
admin.site.register(MinutesAttachment)

admin.site.register(College)
admin.site.register(Department)
admin.site.register(Member)
admin.site.register(User, UserAdmin)

admin.site.register(Ballpark)
admin.site.register(Game)
admin.site.register(MyGamePlayer)
admin.site.register(GameLineup)
admin.site.register(MyPlayer)
admin.site.register(MyTeam)
admin.site.register(Opponent)
admin.site.register(Tournament)
admin.site.register(TournamentEvent)

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
