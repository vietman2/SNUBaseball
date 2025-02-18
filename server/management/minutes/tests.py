from unittest.mock import patch
from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status

from core.tests import generate_test_image_file
from person.user.models import User
from .models import Minutes, MinutesAttachment

class MinutesAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/majors.json", "core/data/test/people.json",
        "core/data/test/minutes.json",
    ]

    def setUp(self):
        self.url = '/v1/minutes/'
        self.user = User.objects.get(username='testuser_1')
        self.data = {
            'title': 'Test Minutes',
            'content': 'Test Content',
        }
        self.attachment = generate_test_image_file()

    @patch('management.minutes.serializers.get_presigned_url')
    def test_list(self, mock_get_presigned_url):
        mock_get_presigned_url.return_value = 'http://test.com/test1.png'
        self.client.force_authenticate(user=self.user)

        ## 1. without query
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. with query
        response = self.client.get(f'{self.url}?query=Test')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('management.minutes.serializers.get_presigned_url')
    @patch('django.core.files.storage.default_storage.save')
    def test_create(self, mock_save, mock_get_presigned_url):
        mock_get_presigned_url.return_value = 'http://test.com/test1.png'
        self.client.force_authenticate(user=self.user)

        ## 1. no attachment
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        ## 2. with attachment
        mock_save.return_value = 'test.jpg'
        data = self.data.copy()
        data['attachments'] = [self.attachment]
        response = self.client.post(self.url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_fail(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('management.minutes.serializers.get_presigned_url')
    def test_retrieve(self, mock_get_presigned_url):
        mock_get_presigned_url.return_value = 'http://test.com/test1.png'
        self.client.force_authenticate(user=self.user)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('management.minutes.serializers.get_presigned_url')
    def test_update(self, mock_get_presigned_url):
        mock_get_presigned_url.return_value = 'http://test.com/test1.png'
        self.client.force_authenticate(user=self.user)

        response = self.client.put(f'{self.url}1/', self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_fail(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.put(f'{self.url}1/', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class MinutesModelTestCase(TestCase):
    fixtures = [
        "core/data/initial/majors.json", "core/data/test/people.json",
        "core/data/test/minutes.json",
    ]

    def test_minutes(self):
        minutes = Minutes.objects.get(pk=1)
        self.assertEqual(str(minutes), minutes.title)

    def test_minutes_attachment(self):
        attachment = MinutesAttachment.objects.get(pk=1)
        self.assertEqual(str(attachment), attachment.file.name.split('/')[-1])
