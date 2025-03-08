from django.db import models

from core.models import TimeStampedModel
from person.member.models import Member
from person.user.models import User
from .enums import MediaType

class Album(TimeStampedModel):
    title           = models.CharField(max_length=255)

    members_only    = models.BooleanField(default=False)

    objects = models.Manager()

    class Meta:
        db_table = 'albums'

class Tag(models.Model):
    name = models.CharField(max_length=20, unique=True)

    objects = models.Manager()

    class Meta:
        db_table = 'tags'

class BaseMedia(models.Model):
    tags        = models.ManyToManyField(Tag, blank=True, related_name='media')
    album       = models.ForeignKey(
        Album,
        on_delete=models.SET_NULL, 
        null=True,
        related_name='media'
    )
    people      = models.ManyToManyField(Member, blank=True, related_name='media')
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='media'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    type        = models.IntegerField(choices=MediaType.choices, default=MediaType.IMAGE)

    objects = models.Manager()

    class Meta:
        db_table = 'base_media'
        ordering = ['-uploaded_at']

class Image(models.Model):
    base        = models.OneToOneField(
        BaseMedia, 
        on_delete=models.CASCADE, 
        related_name='image'
    )
    file        = models.ImageField(upload_to='archive/images/')
    thumbnail   = models.ImageField(upload_to='archive/images/thumbnails/', blank=True, null=True)

    class Meta:
        db_table = 'images'

class Video(models.Model):
    base        = models.OneToOneField(
        BaseMedia, 
        on_delete=models.CASCADE, 
        related_name='video'
    )
    file        = models.FileField(upload_to='archive/videos/')
    thumbnail   = models.ImageField(upload_to='archive/videos/thumbnails/', blank=True, null=True)
    duration    = models.PositiveIntegerField(blank=True, null=True)

    class Meta:
        db_table = 'videos'
