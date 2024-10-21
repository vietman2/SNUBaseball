from io import BytesIO
from PIL import Image as PilImage
from django.core.files.uploadedfile import SimpleUploadedFile

def generate_test_image_file():
    image_file = BytesIO()
    pil_image = PilImage.new('RGB', (100, 100), color='red')
    pil_image.save(image_file, format='PNG')
    image_file.seek(0)

    return SimpleUploadedFile(
        "test1.png",
        image_file.getvalue(),
        content_type="image/png"
    )
