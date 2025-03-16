from django.db import models

class MediaType(models.IntegerChoices):
    IMAGE = 1, "이미지"
    VIDEO = 2, "비디오"
