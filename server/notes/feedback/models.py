from django.db import models

from core.models import Post, Comment, ContentView, Chip
from .enums import StatusType

class FeedbackCategory(Chip):
    class Meta:
        db_table = 'feedback_category'

class Feedback(Post):
    category    = models.ForeignKey(FeedbackCategory, on_delete=models.CASCADE)
    player      = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='feedbacks')
    status      = models.IntegerField(choices=StatusType.choices, default=StatusType.NEW)

    class Meta:
        db_table = 'feedback'
