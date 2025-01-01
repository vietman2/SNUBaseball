from rest_framework import status
from rest_framework.test import APITestCase

from person.user.models import User

class ResultsAPITestCase(APITestCase):
    fixtures = [
        "core/data/test/people.json", "core/data/initial/records_2024.json",
        "core/data/initial/majors.json",
    ]

    def setUp(self):
        self.url = '/v1/results/'
        self.user = User.objects.get(username='testuser_1')

    def test_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url, {'year': 2024})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_fail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
