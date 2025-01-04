from django.db import models

from core.models import Post, Attachment, Comment, ContentView, Chip, Like

class NoticeCategory(Chip):
    def __str__(self):
        return self.label

    class Meta:
        db_table = 'notice_category'
        verbose_name = '공지 분류'
        verbose_name_plural = '공지 분류'

class Notice(Post):
    category    = models.ForeignKey(NoticeCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'notice'
        verbose_name = '공지'
        verbose_name_plural = '공지'
        ordering = ['-created_at']

class NoticeAttachment(Attachment):
    notice      = models.ForeignKey(Notice, on_delete=models.CASCADE)

    def __str__(self):
        name = self.file.name.split('/')[-1]
        return name

    class Meta:
        db_table = 'notice_attachment'
        verbose_name = '공지 첨부파일'
        verbose_name_plural = '공지 첨부파일'

class NoticeComment(Comment):
    notice      = models.ForeignKey(Notice, on_delete=models.CASCADE)

    class Meta:
        db_table = 'notice_comment'
        verbose_name = '공지 댓글'
        verbose_name_plural = '공지 댓글'

class NoticeLike(Like):
    notice      = models.ForeignKey(Notice, on_delete=models.CASCADE)

    objects     = models.Manager()

    class Meta:
        db_table = 'notice_like'
        verbose_name = '공지 좋아요'
        verbose_name_plural = '공지 좋아요'

class NoticeContentView(ContentView):
    notice      = models.ForeignKey(Notice, on_delete=models.CASCADE)

    class Meta:
        db_table = 'notice_content_view'
        verbose_name = '공지 조회'
        verbose_name_plural = '공지 조회'
