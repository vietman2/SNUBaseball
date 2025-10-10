from django.contrib import admin

from .models import Album, MediaTag, GalleryImage, GalleryVideo

admin.site.register(Album)
admin.site.register(MediaTag)
admin.site.register(GalleryImage)
admin.site.register(GalleryVideo)
