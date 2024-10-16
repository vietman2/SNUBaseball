from django.db import models

from core.models import Post, Attachment, Comment, ContentView, Chip
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

class FeedbackAttachment(Attachment):
    feedback    = models.ForeignKey(Feedback, on_delete=models.CASCADE)

    class Meta:
        db_table = 'feedback_attachment'

class FeedbackComment(Comment):
    feedback    = models.ForeignKey(Feedback, on_delete=models.CASCADE, related_name='comments')

    class Meta:
        db_table = 'feedback_comment'

class FeedbackContentView(ContentView):
    feedback    = models.ForeignKey(Feedback, on_delete=models.CASCADE)

    class Meta:
        db_table = 'feedback_content_view'
