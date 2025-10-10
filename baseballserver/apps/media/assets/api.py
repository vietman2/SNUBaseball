# apps/media/api.py
from typing import TYPE_CHECKING

__all__ = (
    "presign_upload",
    "complete_upload",
    "UploadCompleteSerializer",
    "SNUBaseballAsset",
    "SNUBaseballImage",
    "SNUBaseballVideo",
)

if TYPE_CHECKING:
    from .models import SNUBaseballAsset, SNUBaseballImage, SNUBaseballVideo
    from .serializers import UploadCompleteSerializer
    from .services import presign_upload, complete_upload


# Lazy re-exports for models (avoid import-time side effects / cycles)
def __getattr__(name: str):
    if name == "presign_upload":
        from .services import presign_upload

        return presign_upload
    if name == "complete_upload":
        from .services import complete_upload

        return complete_upload
    if name == "UploadCompleteSerializer":
        from .serializers import UploadCompleteSerializer

        return UploadCompleteSerializer
    if name == "SNUBaseballAsset":
        from .models.asset import SNUBaseballAsset

        return SNUBaseballAsset
    if name == "SNUBaseballImage":
        from .models.image import SNUBaseballImage

        return SNUBaseballImage
    if name == "SNUBaseballVideo":
        from .models.video import SNUBaseballVideo

        return SNUBaseballVideo
    raise AttributeError(f"media.api has no attribute {name!r}")
