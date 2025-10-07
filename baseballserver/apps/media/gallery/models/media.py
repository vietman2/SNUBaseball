from django.db import models

from apps.media.assets.api import SNUBaseballImage, SNUBaseballVideo
from core.models import SoftDeleteModel
from .albums import Album
from .tags import MediaTag


class GalleryImage(SoftDeleteModel):
    image = models.OneToOneField(
        SNUBaseballImage, on_delete=models.CASCADE, related_name="gallery_images"
    )
    tags = models.ManyToManyField(MediaTag, blank=True, related_name="images")
    album = models.ForeignKey(
        Album, on_delete=models.SET_NULL, null=True, related_name="images"
    )

    objects = models.Manager()

    class Meta:
        db_table = "gallery_images"
        verbose_name = "갤러리 이미지"
        verbose_name_plural = "갤러리 이미지"

    def __str__(self):
        return self.image.url

    @property
    def type(self):
        return "IMAGE"


class GalleryVideo(SoftDeleteModel):
    video = models.OneToOneField(
        SNUBaseballVideo, on_delete=models.CASCADE, related_name="gallery_videos"
    )
    tags = models.ManyToManyField(MediaTag, blank=True, related_name="videos")
    album = models.ForeignKey(
        Album, on_delete=models.SET_NULL, null=True, related_name="videos"
    )

    objects = models.Manager()

    class Meta:
        db_table = "gallery_videos"
        verbose_name = "갤러리 비디오"
        verbose_name_plural = "갤러리 비디오"

    def __str__(self):
        return self.video.url

    @property
    def type(self):
        return "VIDEO"

    @property
    def thumbnail_url(self):
        return self.video.thumbnail_url
