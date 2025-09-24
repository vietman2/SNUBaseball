import factory
from factory.django import DjangoModelFactory

from apps.media.gallery.models import Album, MediaTag, GalleryImage, GalleryVideo


class GalleryFactory(DjangoModelFactory):
    class Meta:
        model = Album

    @classmethod
    def create_tags(cls) -> list[MediaTag]:
        tags = [
            MediaTag.objects.create(name="tag1"),
            MediaTag.objects.create(name="tag2"),
            MediaTag.objects.create(name="tag3"),
        ]
        return tags

    @classmethod
    def create_public_album(cls, **kwargs) -> Album:
        album = cls.create(members_only=False, **kwargs)

        ## 앨범에 이미지 4개, 동영상 1개 추가
        tags = cls.create_tags()
        for i in range(4):
            img = GalleryImage.objects.create(
                album=album,
                key=f"media/gallery/images/sample_image_{i+1}.jpg",
            )
            img.tags.set([tags[i % len(tags)]])
            img.save()

        video = GalleryVideo.objects.create(
            album=album,
            key="media/gallery/videos/sample_video_1.mp4",
        )
        video.tags.set(tags)
        video.save()

        return album

    @classmethod
    def create_private_album(cls, **kwargs) -> Album:
        album = cls.create(members_only=True, **kwargs)
        return album
