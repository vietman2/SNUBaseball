from typing import TYPE_CHECKING

__all__ = (
    "StoredFile",
    "verify_head",
    "upload_file",
    "presign_post",
    "PresignItemSerializer",
)

if TYPE_CHECKING:
    from .models import StoredFile
    from .serializers import PresignItemSerializer
    from .services import verify_head, presign_post, upload_file


def __getattr__(name: str):
    if name == "StoredFile":
        from .models import StoredFile

        return StoredFile
    if name == "PresignItemSerializer":
        from .serializers import PresignItemSerializer

        return PresignItemSerializer
    if name == "verify_head":
        from .services import verify_head

        return verify_head
    if name == "presign_post":
        from .services import presign_post

        return presign_post
    if name == "upload_file":
        from .services import upload_file

        return upload_file
    raise AttributeError(f"storage.api has no attribute {name!r}")
