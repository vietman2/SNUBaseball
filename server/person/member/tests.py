from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from person.user.models import User
from .models import Member

class MemberAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/majors.json", "core/data/test/tale.json",
        "core/data/test/mock_image.json", "core/data/test/people.json",
    ]

    def setUp(self):
        self.url = '/v1/members/'
        self.member = Member.objects.get(student_id='2024-12345')
        self.user = User.objects.get(member=self.member)
        self.create_data = {
            'first_name': '테스트',
            'last_name': '테스트',
            'student_id': '2024-12346',
            'name': '테스트',
            'admission_year': 2024,
            'major': 1,
            'role': '선수',
            'status': 1,
        }

    def test_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

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

    def test_retrieve_success(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url+'1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(self.url+'2/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(self.url+'3/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_success_player(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, self.create_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_success_manager(self):
        self.client.force_authenticate(user=self.user)
        self.create_data['role'] = '매니저'
        self.create_data.pop('status')
        response = self.client.post(self.url, self.create_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_bad_request(self):
        ## 1. invalid student_id (1)
        self.client.force_authenticate(user=self.user)
        self.create_data['student_id'] = '2024-1234'
        response = self.client.post(self.url, self.create_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 1. invalid student_id (2)
        self.client.force_authenticate(user=self.user)
        self.create_data['student_id'] = '2024-1234e'
        response = self.client.post(self.url, self.create_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 3. invalid role
        self.create_data['student_id'] = '2024-12346'
        self.create_data['role'] = 'invalid role'
        response = self.client.post(self.url, self.create_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_success(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(self.url+'1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class MemberModelTest(TestCase):
    fixtures = [
        "core/data/test/people.json", "core/data/initial/majors.json",
        "core/data/test/mock_image.json"
    ]

    def setUp(self):
        self.member = Member.objects.get(student_id='2024-12345')
        self.user = User.objects.get(member=self.member)

    def test_str(self):
        person = Member.objects.get(pk=1)
        expected_str = "홍길동 (2024)"
        self.assertEqual(str(person), expected_str)
