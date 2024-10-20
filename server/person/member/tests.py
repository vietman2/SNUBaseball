from rest_framework.test import APITestCase
from rest_framework import status

from person.user.models import User
from .models import Member

class MemberAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/majors.json",
        "core/data/test/mock_image.json", "core/data/test/people.json",
    ]

    def setUp(self):
        self.url = '/api/members/'
        self.member = Member.objects.get(student_id='2024-12345')
        self.user = User.objects.get(member=self.member)

    def test_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unallowed_method(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url+'1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_list_success(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url, {'filter': 'ybs'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_bad_request(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.get(self.url, {'filter': 'bad filter'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
