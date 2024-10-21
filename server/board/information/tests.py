from unittest.mock import patch
from rest_framework.test import APITestCase
from rest_framework import status

from core.tests import generate_test_image_file
from person.user.models import User

class InformationAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/majors.json", "core/data/test/people.json",
        "core/data/test/mock_image.json", "core/data/test/information.json",
    ]

    def setUp(self):
        self.url = '/api/informations/'
        self.user = User.objects.get(username='testuser_1')
        self.data = {
            'title': 'Test Information',
            'content': 'Test Content',
            'pin': False,
        }

        self.attachment = generate_test_image_file()

    def test_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.put(f'{self.url}1/', self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_information_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_information_retrieve(self):
        self.client.force_authenticate(user=self.user)
        ## no attachment
        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## with attachment
        response = self.client.get(f'{self.url}3/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('django.core.files.storage.default_storage.save')
    def test_information_create(self, mock_save):
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

    def test_information_create_invalid(self):
        self.client.force_authenticate(user=self.user)
        data = self.data.copy()
        data['title'] = ''
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('django.core.files.storage.default_storage.save')
    def test_information_update(self, mock_save):
        self.client.force_authenticate(user=self.user)
        ## no attachment
        response = self.client.put(f'{self.url}1/', self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## with attachment
        mock_save.return_value = 'test1.png'
        data = self.data.copy()
        data['attachments'] = [self.attachment]
        response = self.client.put(f'{self.url}3/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_information_update_invalid(self):
        self.client.force_authenticate(user=self.user)
        data = self.data.copy()
        data['title'] = ''
        response = self.client.put(f'{self.url}1/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_information_delete(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
