from django.db import models

from core.models import Post, Attachment, Comment, ContentView, Like

class Discussion(Post):
    def __str__(self):
        return self.title

    class Meta:
        db_table = 'discussion'
        verbose_name = '게시글'
        verbose_name_plural = '게시글'

class DiscussionAttachment(Attachment):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)

    def __str__(self):
        name = self.file.name.split('/')[-1]
        return name

    class Meta:
        db_table = 'discussion_attachment'
        verbose_name = '게시글 첨부파일'
        verbose_name_plural = '게시글 첨부파일'

class DiscussionComment(Comment):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)

    class Meta:
        db_table = 'discussion_comment'
        verbose_name = '게시글 댓글'
        verbose_name_plural = '게시글 댓글'

class DiscussionLike(Like):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)

    objects = models.Manager()

    class Meta:
        db_table = 'discussion_like'
        verbose_name = '게시글 좋아요'
        verbose_name_plural = '게시글 좋아요'

class DiscussionContentView(ContentView):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)

    class Meta:
        db_table = 'discussion_content_view'
        verbose_name = '게시글 조회'
        verbose_name_plural = '게시글 조회'
