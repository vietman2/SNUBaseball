from factory import SubFactory, Trait
from factory.django import DjangoModelFactory

from apps.media.assets.models import (
    SNUBaseballAsset,
    SNUBaseballImage,
    SNUBaseballVideo,
)
from .storage import StoredFileFactory


class _BaseFileBackedFactory(DjangoModelFactory):
    """매니저의 update_or_create_by_key를 사용해서 생성하는 베이스 팩토리"""

    class Meta:
        abstract = True

    file = SubFactory(StoredFileFactory)

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        # file 서브팩토리 결과와, 필요하면 key/mime/size를 추출
        file = kwargs.pop("file", None)
        key = kwargs.pop("key", None) or (getattr(file, "key", None))
        uploaded_by = kwargs.pop("uploaded_by", None)

        original_filename = kwargs.pop(
            "original_filename", getattr(file, "original_filename", None)
        )
        mime = kwargs.pop("mime", getattr(file, "mime", None))
        size = kwargs.pop("size", getattr(file, "size", None))

        if not key:
            raise ValueError(
                "key가 필요합니다. file(SubFactory) 또는 key= 로 제공하세요."
            )

        obj, _created = model_class.objects.update_or_create_by_key(
            key=key,
            uploaded_by=uploaded_by,
            original_filename=original_filename,
            mime=mime,
            size=size,
            file=file,
        )

        changed = False
        for name in cls._update_fields:
            if name in kwargs and hasattr(obj, name):
                setattr(obj, name, kwargs[name])
                changed = True
        if changed:
            obj.save()

        return obj


class SNUBaseballAssetFactory(_BaseFileBackedFactory):
    class Meta:
        model = SNUBaseballAsset

    _update_fields = ()
    # Asset은 image/video MIME 금지 → 기본적으로 비-미디어 MIME을 사용
    file = SubFactory(StoredFileFactory, mime="application/pdf")

    class Params:
        binary = Trait(
            file=SubFactory(StoredFileFactory, mime="application/octet-stream")
        )


class SNUBaseballImageFactory(_BaseFileBackedFactory):
    class Meta:
        model = SNUBaseballImage

    _update_fields = ("width", "height")
    # 이미지 MIME 필요
    file = SubFactory(StoredFileFactory, mime="image/png")
    width = 640
    height = 480

    class Params:
        jpeg = Trait(file=SubFactory(StoredFileFactory, mime="image/jpeg"))
        square = Trait(width=512, height=512)


class SNUBaseballVideoFactory(_BaseFileBackedFactory):
    class Meta:
        model = SNUBaseballVideo

    _update_fields = ("duration", "thumbnail_key")
    # 비디오 MIME 필요
    file = SubFactory(StoredFileFactory, mime="video/mp4")
    duration = 10
    thumbnail_key = ""

    class Params:
        with_thumbnail = Trait(thumbnail_key="some_thumbnail_key")
