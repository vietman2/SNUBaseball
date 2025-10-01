import posixpath

from apps.media.assets.api import SNUBaseballImage, presign_upload, complete_upload
from core.error_handling import SNUBaseballException
from .models import GalleryImage, GalleryVideo


def presign_for_album_item(album, *, filename: str, content_type: str, size: int):
    ## 1. Build key
    filename_clean = (filename.strip().replace(" ", "_"))[:100]
    prefix = f"gallery/{album.title}/"
    key = posixpath.join(prefix, filename_clean)

    ## 2. Presign
    return presign_upload(key=key, content_type=content_type or "", size=size)


def complete_album_uploads(*, album, items, tag_ids, user):
    """
    items: [{'key': str, 'original_filename': str}, ...]
    성공/부분실패를 구분하기 위해 (errors 리스트) 반환.
    """
    expected_prefix = f"gallery/{album.title}/"
    errors = []

    for item in items:
        try:
            obj = complete_upload(
                key=item["key"],
                expected_prefix=expected_prefix,
                original_filename=item.get("original_filename"),
                uploaded_by=user,
            )
            if isinstance(obj, SNUBaseballImage):
                gi, _ = GalleryImage.objects.update_or_create(image=obj, album=album)
                if tag_ids:
                    gi.tags.set(tag_ids)
            else:
                gv, _ = GalleryVideo.objects.update_or_create(video=obj, album=album)
                if tag_ids:
                    gv.tags.set(tag_ids)
        except SNUBaseballException as e:
            errors.append({"key": item["key"], "error": str(e)})
    return errors
