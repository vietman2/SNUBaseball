from django.db import models

from core.models import Post, Attachment, ContentView

class Information(Post):
    pin = models.BooleanField(default=False)

    class Meta:
        db_table = 'information'

class InformationAttachment(Attachment):
    information = models.ForeignKey(Information, on_delete=models.CASCADE)

    class Meta:
        db_table = 'information_attachment'

class InformationContentView(ContentView):
    information = models.ForeignKey(Information, on_delete=models.CASCADE)

    class Meta:
        db_table = 'information_content_view'
