from django.contrib import admin

from .assets.models import SNUBaseballAsset, SNUBaseballImage, SNUBaseballVideo

admin.site.register(SNUBaseballAsset)
admin.site.register(SNUBaseballImage)
admin.site.register(SNUBaseballVideo)
