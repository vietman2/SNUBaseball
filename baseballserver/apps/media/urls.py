from django.urls import path
from rest_framework.routers import DefaultRouter

from .gallery.api import (
    AlbumViewSet,
    GalleryMediaAPIView,
    GalleryImageDetailsAPIView,
    GalleryVideoDetailsAPIView,
    AlbumUploadView,
    MediaTagViewSet,
)

router = DefaultRouter()

router.register(r"v1/gallery/albums", AlbumViewSet, basename="gallery_albums")
router.register(r"v1/gallery/tags", MediaTagViewSet, basename="gallery_tags")
router.register(
    r"v1/gallery/images", GalleryImageDetailsAPIView, basename="gallery_image_details"
)
router.register(
    r"v1/gallery/videos", GalleryVideoDetailsAPIView, basename="gallery_video_details"
)

upload = AlbumUploadView.as_view({"post": "upload_presign"})
complete = AlbumUploadView.as_view({"post": "upload_complete"})

urlpatterns = [
    path("v1/gallery/media/", GalleryMediaAPIView.as_view(), name="gallery_media"),
    path(
        "v1/gallery/albums/<int:pk>/upload/presign/",
        upload,
        name="gallery_upload_presign",
    ),
    path(
        "v1/gallery/albums/<int:pk>/upload/complete/",
        complete,
        name="gallery_upload_complete",
    ),
]

urlpatterns += router.urls
