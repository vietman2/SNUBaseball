from unittest.mock import patch
from rest_framework.test import APITestCase
from rest_framework import status

from core.tests import generate_test_image_file
from person.user.models import User
from .models import Image

class ImageAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/majors.json",
        "core/data/test/people.json", "core/data/test/mock_image.json"
    ]

    def setUp(self):
        self.url = '/api/images/'
        self.user = User.objects.get(username='testuser_1')

        test_image1 = generate_test_image_file()
        test_image2 = generate_test_image_file()
        self.data1 = {
            "image": test_image1,
            "path": "test1.png",
        }
        self.data2 = {
            "image": test_image2,
        }

    def test_unauthorized(self):
        response = self.client.post(self.url, self.data1)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    @patch('django.core.files.storage.default_storage.save')
    def test_image_upload(self, mock_save):
        ## with path
        mock_save.return_value = 'test1.png'
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, self.data1, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        ## without path
        mock_save.return_value = 'test2.png'
        response = self.client.post(self.url, self.data2, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_image_upload_fail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, {}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
