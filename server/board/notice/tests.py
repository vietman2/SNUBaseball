from io import BytesIO
from PIL import Image as PilImage
from unittest.mock import patch
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase
from rest_framework import status

from person.user.models import User
from .models import Notice

class NoticeAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/chips.json", "core/data/test/notices.json",
        "core/data/test/people.json", "core/data/test/mock_image.json"
    ]

    def setUp(self):
        self.url = '/api/notices/'
        self.user = User.objects.get(username='testuser_1')
        self.data = {
            'title': 'Test Notice',
            'content': 'Test Content',
            'category_label': '일반',
        }

        image_file_1 = BytesIO()
        pil_image_1 = PilImage.new('RGB', (100, 100), color='red')
        pil_image_1.save(image_file_1, format='PNG')
        image_file_1.seek(0)
        self.attachment = SimpleUploadedFile(
            "test1.png",
            image_file_1.getvalue(),
            content_type="image/png"
        )


    def test_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(f'{self.url}categories/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_notice_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_notice_retrieve(self):
        self.client.force_authenticate(user=self.user)
        ## no attachment
        notice = Notice.objects.first()
        response = self.client.get(f'{self.url}{notice.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## with attachment
        notice = Notice.objects.last()
        response = self.client.get(f'{self.url}{notice.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_notice_category_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'{self.url}categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('django.core.files.storage.default_storage.save')
    def test_notice_create(self, mock_save):
        self.client.force_authenticate(user=self.user)
        ## no attachment
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        ## with attachment
        mock_save.return_value = 'test1.png'
        data = self.data.copy()
        data['attachments'] = [self.attachment]
        response = self.client.post(self.url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_notice_create_invalid_category(self):
        self.client.force_authenticate(user=self.user)
        data = self.data.copy()
        data['category_label'] = 'Invalid'
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
