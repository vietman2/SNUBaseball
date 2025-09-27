from factory.django import DjangoModelFactory

from apps.media.gallery.models import Album, MediaTag, GalleryImage, GalleryVideo
from tests.factories.assets import SNUBaseballImageFactory, SNUBaseballVideoFactory


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
            img = SNUBaseballImageFactory(
                file__key=f"media/gallery/images/sample_image_{i+1}.jpg",
                file__mime="image/jpeg",
                width=1280,
                height=720,
            )
            gi = GalleryImage.objects.create(
                album=album,
                image=img,
            )
            gi.tags.set([tags[i % len(tags)]])
            gi.save()

        vid = SNUBaseballVideoFactory(
            file__key="media/gallery/videos/sample_video_1.mp4",
            file__mime="video/mp4",
            duration=10,
        )
        gv = GalleryVideo.objects.create(
            album=album,
            video=vid,
        )
        gv.tags.set(tags)
        gv.save()

        return album

    @classmethod
    def create_private_album(cls, **kwargs) -> Album:
        album = cls.create(members_only=True, **kwargs)
        return album
