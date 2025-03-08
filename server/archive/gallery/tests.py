import json
import numpy as np
from unittest.mock import patch, MagicMock
from django.core.files.uploadedfile import SimpleUploadedFile, TemporaryUploadedFile
from django.test import override_settings, TestCase
from io import BytesIO
from PIL import Image as PILImage
from rest_framework import status
from rest_framework.test import APITestCase

from core.tests import generate_test_image_file
from person.user.models import User
from .enums import MediaType
from .models import Album, BaseMedia, Image, Video
from .utils import create_image_thumbnail, create_video_thumbnail_and_duration

class UploadAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/chips.json", "core/data/initial/majors.json",
        "core/data/test/notices.json", "core/data/test/people.json",
        "core/data/test/gallery.json",
    ]

    def setUp(self):
        self.url = '/v1/archive/'
        self.user = User.objects.get(username='testuser_1')
        self.image_data = {
            'title': 'Test Image',
            'files': generate_test_image_file(),
        }
        self.bad_file_data = SimpleUploadedFile('bad_file', b'bad_file_data')
        self.video_data = {
            'title': 'Test Video',
            'files': SimpleUploadedFile('test.mp4', b'file_content', content_type='video/mp4'),
        }

    @patch('archive.gallery.serializers.create_image_thumbnail')
    @patch('django.core.files.storage.default_storage.save')
    def test_upload_image(self, mock_save, mock_create_thumbnail):
        mock_create_thumbnail.return_value = SimpleUploadedFile(
            'thumbnail.jpg', b'file_content', content_type='image/jpeg'
        )
        mock_save.return_value = "archive/images/test1.png"
        self.client.force_authenticate(user=self.user)

        ## 1. normal
        response = self.client.post(self.url, self.image_data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        ## 2. with options
        data = {}
        options_data = {'album_id': 1, 'tag_ids': [1], 'member_ids': [1]}
        data['files'] = generate_test_image_file()
        data['options'] = json.dumps(options_data)
        response = self.client.post(self.url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @patch('archive.gallery.serializers.create_video_thumbnail_and_duration')
    @patch('django.core.files.storage.default_storage.save')
    def test_upload_video(self, mock_save, mock_create_thumbnail_and_duration):
        mock_create_thumbnail_and_duration.return_value = (
            SimpleUploadedFile('thumbnail.jpg', b'file_content', content_type='image/jpeg'), 10
        )
        mock_save.return_value = "archive/videos/test.mp4"
        self.client.force_authenticate(user=self.user)

        response = self.client.post(self.url, self.video_data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_upload_fail(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## bad file
        response = self.client.post(
            self.url, {'files': [self.bad_file_data]}, format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## bad options
        options_data = {'album_id': 999}
        data = self.image_data.copy()
        data['options'] = json.dumps(options_data)
        response = self.client.post(self.url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class ArchiveAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/chips.json", "core/data/initial/majors.json",
        "core/data/test/notices.json", "core/data/test/people.json",
        "core/data/test/gallery.json",
    ]

    def setUp(self):
        self.override = override_settings(
            DEFAULT_FILE_STORAGE='django.core.files.storage.FileSystemStorage'
        )
        self.override.enable()
        self.url = '/v1/archive/'
        self.user = User.objects.get(username='testuser_1')

        base_media = BaseMedia.objects.get(pk=1)
        dummy_image = SimpleUploadedFile('dummy.jpg', b'file_content', content_type='image/jpeg')
        Image.objects.create(base=base_media, file=dummy_image, thumbnail=dummy_image)

        base_media = BaseMedia.objects.get(pk=2)
        dummy_video = SimpleUploadedFile('dummy.mp4', b'file_content')
        Video.objects.create(base=base_media, file=dummy_video)

    def tearDown(self):
        self.override.disable()

    @patch('archive.gallery.serializers.get_presigned_url')
    def test_list(self, mock_presigned_url):
        mock_presigned_url.return_value = 'http://test.com'
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(f'{self.url}?album=1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(f'{self.url}?tag=1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(f'{self.url}?member=1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(f'{self.url}?album=-1?page=1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_fail(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve(self):
        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.force_authenticate(user=self.user)

        ## image
        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## video
        response = self.client.get(f'{self.url}2/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.put(f'{self.url}1/', {})
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.patch(f'{self.url}1/', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## set album
        response = self.client.patch(f'{self.url}1/', {'album': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## reset album
        response = self.client.patch(f'{self.url}1/', {'album': -1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## set tag
        response = self.client.patch(f'{self.url}1/', {'tag': [1]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## reset tag
        response = self.client.patch(f'{self.url}1/', {'tag': [1]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## set member
        response = self.client.patch(f'{self.url}2/', {'person': [1]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## reset member
        response = self.client.patch(f'{self.url}2/', {'person': [1]})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class AlbumAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/chips.json", "core/data/initial/majors.json",
        "core/data/test/notices.json", "core/data/test/people.json",
        "core/data/test/gallery.json",
    ]

    def setUp(self):
        self.url = '/v1/archive/albums/'
        self.admin = User.objects.get(username='testuser_1')
        self.override = override_settings(
            DEFAULT_FILE_STORAGE='django.core.files.storage.FileSystemStorage'
        )
        self.override.enable()

        base_media = BaseMedia.objects.get(pk=1)
        dummy_image = SimpleUploadedFile('dummy.jpg', b'file_content', content_type='image/jpeg')
        Image.objects.create(base=base_media, file=dummy_image)

        album = Album.objects.get(pk=1)
        ## create 5 images for album 1 for coverage
        for i in range(5):
            base_media = BaseMedia.objects.create(album=album, type=MediaType.IMAGE)
            Image.objects.create(base=base_media, file=dummy_image)

    def tearDown(self):
        self.override.disable()

    def test_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.force_authenticate(user=self.admin)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.post(self.url, {'title': 'Test Album'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_fail(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.put(f'{self.url}1/', {'title': 'New Title'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.put(f'{self.url}1/', {'title': ''})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class TagAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/chips.json", "core/data/initial/majors.json",
        "core/data/test/notices.json", "core/data/test/people.json",
        "core/data/test/gallery.json",
    ]

    def setUp(self):
        self.url = '/v1/archive/tags/'
        self.admin = User.objects.get(username='testuser_1')

    def test_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.force_authenticate(user=self.admin)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.post(self.url, {'name': 'Test Tag'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_fail(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve(self):
        self.client.force_authenticate(user=self.admin)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

class UploadUtilsTestCase(TestCase):
    def test_image_thumnail(self):
        ## 1. PNG
        image = generate_test_image_file()
        thumbnail = create_image_thumbnail(image)
        self.assertTrue(thumbnail.name.endswith('.png'))    

        ## 2. JPEG (RGB)
        jpeg_image = BytesIO()
        pil_image = PILImage.new('RGB', (100, 100), color='red')
        pil_image.save(jpeg_image, format='JPEG')
        jpeg_image.seek(0)
        image = SimpleUploadedFile('test2.jpg', jpeg_image.getvalue(), content_type='image/jpeg')
        thumbnail = create_image_thumbnail(image)
        self.assertTrue(thumbnail.name.endswith('.jpg'))

        ## 3. JPEG (not RGB)
        jpeg_image = BytesIO()
        pil_image = PILImage.new('L', (100, 100), color='red')
        pil_image.save(jpeg_image, format='JPEG')
        jpeg_image.seek(0)
        image = SimpleUploadedFile('test3.jpg', jpeg_image.getvalue(), content_type='image/jpeg')
        thumbnail = create_image_thumbnail(image)
        self.assertTrue(thumbnail.name.endswith('.jpg'))

        ## 4. Other format (GIF)
        gif_image = BytesIO()
        pil_image = PILImage.new('RGB', (100, 100), color='red')
        pil_image.save(gif_image, format='GIF')
        gif_image.seek(0)
        image = SimpleUploadedFile('test4.gif', gif_image.getvalue(), content_type='image/gif')
        thumbnail = create_image_thumbnail(image)
        self.assertTrue(thumbnail.name.endswith('.gif'))

    @patch('archive.gallery.utils.VideoFileClip')
    def test_video_thumbnail_and_duration(self, mock_video_clip):
        mock_clip = MagicMock()
        mock_clip.duration = 10
        mock_frame = np.zeros((100, 100, 3), dtype=np.uint8)
        mock_clip.get_frame.return_value = mock_frame
        mock_video_clip.return_value = mock_clip

        video_file = BytesIO(b'file_content')
        video_file.name = 'test.mp4'
        video = TemporaryUploadedFile('test.mp4', video_file.getvalue(), size=video_file.tell(), charset='utf-8')
        thumbnail, duration = create_video_thumbnail_and_duration(video)
        self.assertTrue(thumbnail.name.endswith('.jpg'))
        self.assertEqual(duration, 10)
