from django.core.exceptions import ValidationError
from django.db import models, transaction, IntegrityError
from django.utils import timezone

from apps.media.storage.api import StoredFile

KEY_MISSING_ERROR = "Key는 필수입니다."


class BaseFileManager(models.Manager):
    def _update_fields(self, **kwargs):
        """
        uploaded_by는 업데이트 불가.
        업데이트 필드가 있을 시, updated_at도 같이 업데이트.
        """
        updates = {}
        if "original_filename" in kwargs:
            updates["original_filename"] = kwargs.pop("original_filename")
        if "mime" in kwargs:
            updates["mime"] = kwargs.pop("mime")
        if "size" in kwargs:
            updates["size"] = kwargs.pop("size")

        if updates:
            updates["updated_at"] = timezone.now()
            return updates

        return None

    def _create_fields(self, **kwargs):
        fields = {}
        if "original_filename" in kwargs:
            fields["original_filename"] = kwargs.pop("original_filename")
        if "mime" in kwargs:
            fields["mime"] = kwargs.pop("mime")
        if "size" in kwargs:
            fields["size"] = kwargs.pop("size")

        return fields

    def _update_or_create_stored_file(self, *, key=None, **kwargs):
        try:
            file = StoredFile.objects.get(key=key)
            updates = self._update_fields(**kwargs)
            if updates:
                for attr, value in updates.items():
                    setattr(file, attr, value)
                file.save()

            return file, False
        except StoredFile.DoesNotExist:
            fields = self._create_fields(**kwargs)
            try:
                file = StoredFile.objects.create(key=key, **fields)
                return file, True
            except IntegrityError:
                # 동시성 문제로 인해, 다른 트랜잭션에서 동일 키로 생성했을 수 있음
                file = StoredFile.objects.get(key=key)
                updates = self._update_fields(**kwargs)
                if updates:
                    for attr, value in updates.items():
                        setattr(file, attr, value)
                    file.save()
                return file, False

    def update_or_create_by_key(self, *, key=None, **kwargs):
        with transaction.atomic():
            file, created = self._update_or_create_stored_file(key=key, **kwargs)
            qs = super().get_queryset()
            if created:
                try:
                    obj = qs.create(file=file, uploaded_by=kwargs.get("uploaded_by"))
                except IntegrityError:
                    obj = qs.get(file=file)
                return obj, True
            else:
                try:
                    obj = qs.get(file=file)
                except qs.model.DoesNotExist:
                    try:
                        obj = qs.create(file=file, uploaded_by=kwargs.get("uploaded_by"))
                    except IntegrityError:
                        obj = qs.get(file=file)
                    return obj, True
                return obj, False

    ## 일반 update, create, get_or_create, update_or_create를 전부 막는다
    def update(self, *args, **kwargs):
        raise NotImplementedError(
            "update()는 지원하지 않습니다. update_or_create_by_key()를 사용하세요."
        )

    def create(self, *args, **kwargs):
        raise NotImplementedError(
            "create()는 지원하지 않습니다. update_or_create_by_key()를 사용하세요."
        )

    def get_or_create(self, *args, **kwargs):
        raise NotImplementedError(
            "get_or_create()는 지원하지 않습니다. update_or_create_by_key()를 사용하세요."
        )

    def update_or_create(self, *args, **kwargs):
        raise NotImplementedError(
            "update_or_create()는 지원하지 않습니다. update_or_create_by_key()를 사용하세요."
        )


class AssetsManager(BaseFileManager):

    def update_or_create_by_key(self, *, key=None, **kwargs):
        if not key:
            raise ValidationError(KEY_MISSING_ERROR)

        mime = kwargs.get("mime") or getattr(kwargs.get("file"), "mime", None)
        if mime and mime.startswith("image/"):
            raise ValidationError("Image MIME type not allowed")
        if mime and mime.startswith("video/"):
            raise ValidationError("Video MIME type not allowed")

        return super().update_or_create_by_key(key=key, **kwargs)

class ImagesManager(BaseFileManager):

    def update_or_create_by_key(self, *, key=None, **kwargs):
        if not key:
            raise ValidationError(KEY_MISSING_ERROR)

        mime = kwargs.get("mime") or getattr(kwargs.get("file"), "mime", None)
        if mime and not mime.startswith("image/"):
            raise ValidationError("Image MIME type expected")

        return super().update_or_create_by_key(key=key, **kwargs)

class VideosManager(BaseFileManager):

    def update_or_create_by_key(self, *, key=None, **kwargs):
        if not key:
            raise ValidationError(KEY_MISSING_ERROR)

        mime = kwargs.get("mime") or getattr(kwargs.get("file"), "mime", None)
        if mime and not mime.startswith("video/"):
            raise ValidationError("Video MIME type expected")

        return super().update_or_create_by_key(key=key, **kwargs)
