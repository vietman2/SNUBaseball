from rest_framework.test import APITestCase
from rest_framework import status

from person.user.models import User

class InformationAPITestCase(APITestCase):
    fixtures = [
        "core/data/test/people.json", "core/data/test/mock_image.json",
        "core/data/test/information.json",
    ]

    def setUp(self):
        self.url = '/api/informations/'
        self.user = User.objects.get(username='testuser_1')

    def test_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_information_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
