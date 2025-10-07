from typing import Literal

from apps.media.storage.api import StoredFile
from core.error_handling import SNUBaseballException
from .models import SNUBaseballAsset, SNUBaseballImage, SNUBaseballVideo

Kind = Literal["IMAGE", "VIDEO", "ASSET"]


def get_file_type(ct: str | None) -> Kind:
    """
    MIME 타입으로부터, Asset의 유형을 결정합니다.
    - "IMAGE" | "VIDEO" | "ASSET"
    """
    ct = (ct or "").lower()
    ct = ct.split(";", 1)[0].strip()

    if ct.startswith("image/"):
        return "IMAGE"
    if ct.startswith("video/"):
        return "VIDEO"
    return "ASSET"


def get_existing_file_type(key: str) -> Kind | None:
    """
    기존에 존재하는 키라면, Asset의 유형을 반환합니다.
    - "IMAGE" | "VIDEO" | "ASSET" | None (새 키) | 예외 (알 수 없는 유형)
    """
    existing_file_id = (
        StoredFile.objects.filter(key=key).values_list("pk", flat=True).first()
    )
    if not existing_file_id:
        return None

    is_img = SNUBaseballImage.objects.filter(file_id=existing_file_id).exists()
    is_vid = SNUBaseballVideo.objects.filter(file_id=existing_file_id).exists()
    is_ast = SNUBaseballAsset.objects.filter(file_id=existing_file_id).exists()

    total = int(is_img) + int(is_vid) + int(is_ast)
    if total == 0:
        raise SNUBaseballException("Asset의 유형을 확인할 수 없습니다.")
    if total > 1:
        # 불변성 붕괴: 같은 파일에 복수 타입 연결
        raise SNUBaseballException("동일 파일에 중복 유형이 연결되어 있습니다.")

    if is_img:
        return "IMAGE"
    if is_vid:
        return "VIDEO"
    return "ASSET"
