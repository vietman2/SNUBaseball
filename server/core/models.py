from django.db import models

class TimeStampedModel(models.Model):
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Post(TimeStampedModel):
    title       = models.CharField(max_length=40)
    content     = models.TextField()

    author      = models.ForeignKey('user.User', on_delete=models.CASCADE)

    num_views   = models.IntegerField(default=0)

    is_deleted  = models.BooleanField(default=False)

    objects     = models.Manager()

    class Meta:
        abstract = True

class Attachment(TimeStampedModel):
    ## ForeignKey는 별도로 연결해야함
    file        = models.FileField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

class Comment(TimeStampedModel):
    ## ForeignKey는 별도로 연결해야함
    author      = models.ForeignKey('user.User', on_delete=models.CASCADE)
    content     = models.TextField()

    is_deleted  = models.BooleanField(default=False)

    class Meta:
        abstract = True

class Like(models.Model):
    user        = models.ForeignKey('user.User', on_delete=models.CASCADE)
    liked_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

class ContentView(models.Model):
    ## ForeignKey는 별도로 연결해야함
    user            = models.ForeignKey('user.User', on_delete=models.CASCADE)
    viewed_first_at = models.DateTimeField(auto_now_add=True)
    viewed_last_at  = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Chip(models.Model):
    label               = models.CharField(max_length=20)
    color               = models.CharField(max_length=7)
    background_color    = models.CharField(max_length=7)

    objects             = models.Manager()

    class Meta:
        abstract = True
