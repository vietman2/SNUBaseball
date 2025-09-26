from typing import TYPE_CHECKING

__all__ = (
    "StoredFile",
    "verify_head",
    "presign_post",
)

if TYPE_CHECKING:
    from .models import StoredFile
    from .services import verify_head, presign_post


def __getattr__(name: str):
    if name == "StoredFile":
        from .models import StoredFile

        return StoredFile
    if name == "verify_head":
        from .services import verify_head

        return verify_head
    if name == "presign_post":
        from .services import presign_post

        return presign_post
    raise AttributeError(f"storage.api has no attribute {name!r}")
