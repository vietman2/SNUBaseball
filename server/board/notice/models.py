from django.db import models

from core.models import Post, Attachment, Comment, ContentView, Chip

class NoticeCategory(Chip):
    class Meta:
        db_table = 'notice_category'

class Notice(Post):
    category    = models.ForeignKey(NoticeCategory, on_delete=models.CASCADE)

    class Meta:
        db_table = 'notice'

class NoticeAttachment(Attachment):
    notice      = models.ForeignKey(Notice, on_delete=models.CASCADE)

    class Meta:
        db_table = 'notice_attachment'

class NoticeComment(Comment):
    notice      = models.ForeignKey(Notice, on_delete=models.CASCADE)

    class Meta:
        db_table = 'notice_comment'

class NoticeContentView(ContentView):
    notice      = models.ForeignKey(Notice, on_delete=models.CASCADE)

    class Meta:
        db_table = 'notice_content_view'
