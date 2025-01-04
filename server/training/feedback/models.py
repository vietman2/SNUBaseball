from django.db import models

from core.models import Post, Comment, ContentView, Chip
from person.member.models import Member
from .enums import StatusType

class FeedbackCategory(Chip):
    class Meta:
        db_table = 'feedback_category'
        verbose_name = '피드백 분류'
        verbose_name_plural = '피드백 분류'

class Feedback(Post):
    category    = models.ForeignKey(FeedbackCategory, on_delete=models.CASCADE)
    player      = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='feedbacks')
    status      = models.IntegerField(choices=StatusType.choices, default=StatusType.NEW)

    class Meta:
        db_table = 'feedback'
        verbose_name = '피드백'
        verbose_name_plural = '피드백'

class FeedbackComment(Comment):
    feedback    = models.ForeignKey(Feedback, on_delete=models.CASCADE, related_name='comments')

    class Meta:
        db_table = 'feedback_comment'
        verbose_name = '피드백 댓글'
        verbose_name_plural = '피드백 댓글'

class FeedbackContentView(ContentView):
    feedback    = models.ForeignKey(Feedback, on_delete=models.CASCADE)

    class Meta:
        db_table = 'feedback_content_view'
        verbose_name = '피드백 조회'
        verbose_name_plural = '피드백 조회'
