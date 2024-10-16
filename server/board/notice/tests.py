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

    def test_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_notice_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_notice_retrieve(self):
        self.client.force_authenticate(user=self.user)
        notice = Notice.objects.first()
        response = self.client.get(f'{self.url}{notice.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
