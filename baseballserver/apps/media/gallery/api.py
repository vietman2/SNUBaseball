from typing import TYPE_CHECKING

__all__ = (
    "AlbumViewSet",
    "GalleryMediaAPIView",
    "GalleryImageDetailsAPIView",
    "GalleryVideoDetailsAPIView",
    "AlbumUploadView",
    "MediaTagViewSet",
)

if TYPE_CHECKING:
    from .views import (
        AlbumViewSet,
        GalleryMediaAPIView,
        GalleryImageDetailsAPIView,
        GalleryVideoDetailsAPIView,
        AlbumUploadView,
        MediaTagViewSet,
    )


def __getattr__(name: str):
    if name == "AlbumViewSet":
        from .views import AlbumViewSet

        return AlbumViewSet
    if name == "GalleryMediaAPIView":
        from .views import GalleryMediaAPIView

        return GalleryMediaAPIView
    if name == "GalleryImageDetailsAPIView":
        from .views import GalleryImageDetailsAPIView

        return GalleryImageDetailsAPIView
    if name == "GalleryVideoDetailsAPIView":
        from .views import GalleryVideoDetailsAPIView

        return GalleryVideoDetailsAPIView
    if name == "AlbumUploadView":
        from .views import AlbumUploadView

        return AlbumUploadView
    if name == "MediaTagViewSet":
        from .views import MediaTagViewSet

        return MediaTagViewSet
    raise AttributeError(f"gallery.api has no attribute {name!r}")
