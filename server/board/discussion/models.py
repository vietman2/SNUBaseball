from django.db import models

from core.models import Post, Attachment, Comment, ContentView, Like

class Discussion(Post):
    class Meta:
        db_table = 'discussion'

class DiscussionAttachment(Attachment):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)

    class Meta:
        db_table = 'discussion_attachment'

class DiscussionComment(Comment):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)

    class Meta:
        db_table = 'discussion_comment'

class DiscussionLike(Like):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)

    objects = models.Manager()

    class Meta:
        db_table = 'discussion_like'

class DiscussionContentView(ContentView):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE)

    class Meta:
        db_table = 'discussion_content_view'
