from factory.django import DjangoModelFactory

from apps.media.gallery.models import Album, MediaTag, GalleryImage, GalleryVideo
from tests.factories.assets import SNUBaseballImageFactory, SNUBaseballVideoFactory
from tests.factories.users import UserFactory


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
        user = UserFactory.create_admin()

        ## 앨범에 이미지 4개, 동영상 2개 추가
        tags = cls.create_tags()
        for i in range(4):
            ## 태그는 tag1 3개, tag2 1개, tag3 0개 연결한다
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
            if i < 3:
                gi.tags.set([tags[0]])
            else:
                gi.tags.set([tags[1]])
                img.uploaded_by = user
                img.save()
            gi.save()

        vid = SNUBaseballVideoFactory(
            file__key="media/gallery/videos/sample_video_1.mp4",
            file__mime="video/mp4",
            duration=10,
            uploaded_by=user,
        )
        gv = GalleryVideo.objects.create(
            album=album,
            video=vid,
        )
        ## 태그는 tag1만 연결한다
        gv.tags.set([tags[0]])
        gv.save()

        vid2 = SNUBaseballVideoFactory(
            file__key="media/gallery/videos/sample_video_2.mp4",
            file__mime="video/mp4",
            duration=20,
        )
        GalleryVideo.objects.create(
            album=album,
            video=vid2,
        )

        return album

    @classmethod
    def create_private_album(cls, **kwargs) -> Album:
        album = cls.create(members_only=True, **kwargs)
        ## 앨범에 이미지 1개 추가
        img = SNUBaseballImageFactory(
            file__key="media/gallery/images/private_image_1.jpg",
            file__mime="image/jpeg",
            width=1280,
            height=720,
        )
        gi = GalleryImage.objects.create(
            album=album,
            image=img,
        )
        gi.save()
        return album

    @classmethod
    def create_empty_album(cls, **kwargs) -> Album:
        album = cls.create(members_only=False, **kwargs)
        return album
