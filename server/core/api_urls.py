from django.urls import path
from dj_rest_auth.views import LoginView, LogoutView
from dj_rest_auth.jwt_auth import get_refresh_view
from rest_framework.routers import DefaultRouter

from accountings.account.views import AccountView
from accountings.transaction.views import TransactionView

from board.discussion.views import DiscussionView, DiscussionCommentView
from board.notice.views import NoticeView, NoticeCommentView

from management.equipment.views import EquipmentCategoryView

from person.major.views import MajorViewSet
from person.member.views import MemberViewSet
from person.user.views import RegisterView, StudentIdCheckView, UserProfileView

from records.officialgame.views import ResultsView, TeamView

from training.feedback.views import FeedbackView, FeedbackCommentView
from training.guideline.views import GuidelineView, GuidelineCommentView
#from schedule.weekly.views import WeeklyScheduleViewSet

router = DefaultRouter()

router.register('accounts', AccountView, basename='accounts')
router.register('transactions', TransactionView, basename='transactions')

router.register(
    'discussions/(?P<discussion_id>[0-9]+)/comments',
    DiscussionCommentView,
    basename='discussion_comments'
)
router.register('discussions', DiscussionView, basename='discussions')
router.register(
    'notices/(?P<notice_id>[0-9]+)/comments',
    NoticeCommentView,
    basename='notice_comments'
)
router.register('notices', NoticeView, basename='notices')

router.register('equipment', EquipmentCategoryView, basename='equipment_categories')

router.register('majors', MajorViewSet, basename='majors')
router.register('members', MemberViewSet, basename='members')
router.register('profiles', UserProfileView, basename='profile')

router.register('results', ResultsView, basename='results')
router.register('teams', TeamView, basename='teams')

#router.register('weekly', WeeklyScheduleViewSet, basename='weekly_schedules')

router.register(
    'feedbacks/(?P<feedback_id>[0-9]+)/comments',
    FeedbackCommentView,
    basename='feedback_comments'
)
router.register('feedbacks', FeedbackView, basename='feedbacks')
router.register(
    'guidelines/(?P<guideline_id>[0-9]+)/comments',
    GuidelineCommentView,
    basename='guideline_comments'
)
router.register('guidelines', GuidelineView, basename='guidelines')

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('student_id/', StudentIdCheckView.as_view(), name='student_id_check'),

    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
]

urlpatterns += router.urls
