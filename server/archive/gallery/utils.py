from django.core.files.base import ContentFile
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO
from moviepy import VideoFileClip
from PIL import Image as PILImage

def create_video_thumbnail_and_duration(video_file):
    clip = VideoFileClip(video_file.temporary_file_path())

    frame = clip.get_frame(0)
    image = PILImage.fromarray(frame)

    image.thumbnail((400, 400))

    thumb_io = BytesIO()
    image.save(thumb_io, format='JPEG', quality=100)

    file_name = video_file.name.split('.')[0]
    thumb_name = f'{file_name}.jpg'

    thumbnail = InMemoryUploadedFile(
        ContentFile(thumb_io.getvalue()),
        None,
        thumb_name,
        'image/jpeg',
        thumb_io.tell(),
        None
    )

    duration = int(clip.duration)

    clip.close()

    return thumbnail, duration

def create_image_thumbnail(image):
    img = PILImage.open(image)
    img.thumbnail((400, 400))

    thumb_io = BytesIO()
    original_format = img.format or 'JPEG'
    target_format = original_format.upper()

    content_type = f'image/jpeg'
    save_kwargs = {'quality': 100}

    if target_format == 'PNG':
        content_type = 'image/png'
        save_kwargs = {'optimize': True}
    elif target_format in ['JPEG', 'JPG']:
        if img.mode != 'RGB':
            img = img.convert('RGB')
    else:
        target_format = 'JPEG'
        content_type = 'image/jpeg'
        save_kwargs = {'quality': 100}
        img = img.convert('RGB')

    img.save(thumb_io, format=target_format, **save_kwargs)

    thumbnail = InMemoryUploadedFile(
        ContentFile(thumb_io.getvalue()),
        None,
        image.name,
        content_type,
        thumb_io.tell(),
        None
    )

    return thumbnail
