from django.urls import path
from rest_framework.routers import DefaultRouter

from .gallery.api import AlbumViewSet, GalleryDataAPIView

router = DefaultRouter()

router.register(r"v1/gallery/albums", AlbumViewSet, basename="gallery_albums")

urlpatterns = [
    path("v1/gallery/", GalleryDataAPIView.as_view(), name="gallery_data"),
]

urlpatterns += router.urls
