from typing import TYPE_CHECKING

__all__ = (
    "AlbumViewSet",
    "GalleryDataAPIView",
    "AlbumUploadView",
)

if TYPE_CHECKING:
    from .views import (
        AlbumViewSet,
        GalleryDataAPIView,
        AlbumUploadView,
    )


def __getattr__(name: str):
    if name == "AlbumViewSet":
        from .views import AlbumViewSet

        return AlbumViewSet
    if name == "GalleryDataAPIView":
        from .views import GalleryDataAPIView

        return GalleryDataAPIView
    if name == "AlbumUploadView":
        from .views import AlbumUploadView

        return AlbumUploadView
    raise AttributeError(f"gallery.api has no attribute {name!r}")
