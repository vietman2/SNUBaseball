from django.db import models

from core.models import Post, Comment, Like, ContentView

class GuidelineCategory(models.Model):
    name    = models.CharField(max_length=50, unique=True)

    objects = models.Manager()

    class Meta:
        db_table = "guideline_category"
        verbose_name = "가이드라인 분류"
        verbose_name_plural = "가이드라인 분류"

class Guideline(Post):
    category    = models.ForeignKey(GuidelineCategory, on_delete=models.CASCADE)
    video_id    = models.CharField(max_length=20, null=True, blank=True)

    is_drill    = models.BooleanField(default=False)
    is_indoor   = models.BooleanField(default=False)
    min_people  = models.IntegerField(default=0)
    max_people  = models.IntegerField(default=3)

    objects     = models.Manager()

    class Meta:
        db_table = "guideline"
        verbose_name = "가이드라인"
        verbose_name_plural = "가이드라인"

class GuidelineComment(Comment):
    guideline   = models.ForeignKey(Guideline, on_delete=models.CASCADE, related_name="comments")

    objects     = models.Manager()

    class Meta:
        db_table = "guideline_comment"
        verbose_name = "가이드라인 댓글"
        verbose_name_plural = "가이드라인 댓글"

class GuidelineLike(Like):
    guideline   = models.ForeignKey(Guideline, on_delete=models.CASCADE, related_name="likes")

    objects     = models.Manager()

    class Meta:
        db_table = "guideline_like"
        verbose_name = "가이드라인 좋아요"
        verbose_name_plural = "가이드라인 좋아요"

class GuidelineContentView(ContentView):
    guideline   = models.ForeignKey(Guideline, on_delete=models.CASCADE)

    objects     = models.Manager()

    class Meta:
        db_table = "guideline_content_view"
        verbose_name = "가이드라인 조회"
        verbose_name_plural = "가이드라인 조회"
