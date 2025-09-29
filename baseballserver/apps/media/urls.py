from django.urls import path
from rest_framework.routers import DefaultRouter

from .gallery.api import AlbumViewSet, GalleryDataAPIView, AlbumUploadView

router = DefaultRouter()

router.register(r"v1/gallery/albums", AlbumViewSet, basename="gallery_albums")

upload = AlbumUploadView.as_view({"post": "upload_presign"})
complete = AlbumUploadView.as_view({"post": "upload_complete"})

urlpatterns = [
    path("v1/gallery/", GalleryDataAPIView.as_view(), name="gallery_data"),
    path("v1/gallery/albums/<int:pk>/upload/presign/", upload, name="gallery_upload_presign"),
    path(
        "v1/gallery/albums/<int:pk>/upload/complete/", complete, name="gallery_upload_complete"
    ),
]

urlpatterns += router.urls
