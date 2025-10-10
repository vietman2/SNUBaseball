from django.db import transaction

from apps.media.storage.api import verify_head
from core.error_handling import SNUBaseballException
from ..models import SNUBaseballAsset, SNUBaseballImage, SNUBaseballVideo
from ..tasks import generate_video_thumbnail
from ..utils import get_file_type, get_existing_file_type


def complete_upload(
    key: str, expected_prefix: str, original_filename: str | None, uploaded_by
) -> SNUBaseballAsset | SNUBaseballImage | SNUBaseballVideo:
    """
    S3에 업로드가 완료된 파일을, Asset으로 확정.
    반환 값: SNUBaseballFile, SNUBaseballImage, SNUBaseballVideo 중 하나
      - 이미 존재하는 키라면, 업데이트 (단, 타입이 다르면 에러)
      - 그렇지 않으면 생성
    """
    if not key.startswith(expected_prefix):
        raise SNUBaseballException("유효하지 않은 키입니다.")

    ## S3에 업로드된 파일이 실제로 존재하는지, 그리고 메타정보를 HEAD로 확인
    head = verify_head(key)

    file_type = get_file_type(head.get("content_type"))

    ## 키가 이미 존재하는지 확인
    existing_type = get_existing_file_type(key)

    if existing_type is not None and existing_type != file_type:
        raise SNUBaseballException("파일 유형이 일치하지 않습니다.")

    ## 업데이트 / 생성 로직은 Manager에서 처리
    data = {
        "original_filename": original_filename or "",
        "mime": head.get("content_type"),
        "size": head.get("size", 0),
        "uploaded_by": uploaded_by,
    }

    if file_type == "IMAGE":
        obj, _ = SNUBaseballImage.objects.update_or_create_by_key(key=key, **data)
    elif file_type == "VIDEO":
        obj, created = SNUBaseballVideo.objects.update_or_create_by_key(key=key, **data)

        ## 썸네일 생성 task 큐에 추가
        def _enqueue():
            if created or not getattr(obj, "thumbnail_key", None):
                generate_video_thumbnail.delay(key=key, video_url=obj.file.url)

        transaction.on_commit(_enqueue)
    else:  # file_type == "ASSET"
        obj, _ = SNUBaseballAsset.objects.update_or_create_by_key(key=key, **data)

    return obj
