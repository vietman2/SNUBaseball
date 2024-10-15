from rest_framework.test import APITestCase
from rest_framework import status

class MajorViewSetTest(APITestCase):
    fixtures = ["core/data/initial/majors.json"]

    def test_unallowed_methods(self):
        response = self.client.get('/api/majors/1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_list(self):
        response = self.client.get('/api/majors/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
