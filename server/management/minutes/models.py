from django.db import models

from core.models import Post, Attachment

class Minutes(Post):
    def __str__(self):
        return self.title

    class Meta:
        db_table = 'minutes'
        verbose_name = '회의록'
        verbose_name_plural = '회의록'
        ordering = ['-created_at']

class MinutesAttachment(Attachment):
    minutes     = models.ForeignKey(Minutes, on_delete=models.CASCADE)

    def __str__(self):
        name = self.file.name.split('/')[-1]
        return name

    class Meta:
        db_table = 'minutes_attachment'
        verbose_name = '회의록 첨부파일'
        verbose_name_plural = '회의록 첨부파일'
