from unittest.mock import patch
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from core.tests import generate_test_image_file
from person.user.models import User
from .models import Member
from .utils import get_status_choice, get_role_choice, get_hands_choice, get_profile_image_url

class MemberAPITestCase(APITestCase):
    fixtures = ["core/data/initial/majors.json", "core/data/test/people.json"]

    def setUp(self):
        self.url = '/v1/members/'
        self.member = Member.objects.get(student_id='2024-12345')
        self.user = User.objects.get(member=self.member)
        self.create_data = {
            'first_name': '테스트',
            'last_name': '테스트',
            'admission_year': 2024,
        }
        self.update_data = {
            'admission_year': 2025,
            'student_id': '2024-12345',
            'major': 1,
            'phone': '010-1234-5678',
            'email': 'em@ail.com',
            'address': '서울시 강남구',
            'birth_date': '2000-01-01',
            'notes': '테스트',
            'role': '주장',
            'status': '활동중',
            'date_joined': '2024-01-01',
            'num_semester': 1,
            'hands': '우투우타',
            'position': '테스트',
            'back_number': 1,
            'is_elite': True,
        }

    def test_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    @patch('person.member.serializers.get_profile_image_url')
    def test_list_success(self, mock_get_profile_image_url):
        mock_get_profile_image_url.return_value = 'http://test.com'
        self.client.force_authenticate(user=self.user)

        ## 1. all
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. ybs
        response = self.client.get(self.url, {'filter': 'ybs'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 3. obs
        response = self.client.get(self.url, {'filter': 'obs'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 4. others
        response = self.client.get(self.url, {'filter': 'others'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 5. search
        response = self.client.get(self.url, {'search': '김철수'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_bad_request(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.url, {'filter': 'bad filter'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('person.member.serializers.get_profile_image_url')
    def test_retrieve_success(self, mock_get_profile_image_url):
        mock_get_profile_image_url.return_value = 'http://test.com'
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.url+'1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(self.url+'2/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(self.url+'3/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_success(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, self.create_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_failure(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_success(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(self.url+'1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_success(self):
        self.client.force_authenticate(user=self.user)
        ## 1. with all data
        response = self.client.put(self.url+'1/', self.update_data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        ## 2. with partial data
        data = self.update_data.copy()
        data['student_id'] = None
        data['major'] = None
        response = self.client.put(self.url+'1/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_failure(self):
        self.client.force_authenticate(user=self.user)
        ## 1. invalid student_id (1)
        data = self.update_data.copy()
        data['student_id'] = '202412345'
        response = self.client.put(self.url+'1/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 2. invalid student_id (2)
        data['student_id'] = 'asdf-qwert'
        response = self.client.put(self.url+'1/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('django.core.files.storage.default_storage.save')
    def test_update_profile_image(self, mock_save):
        mock_save.return_value = 'test1.png'
        self.client.force_authenticate(user=self.user)
        profile_image = generate_test_image_file()
        response = self.client.post(self.url+'1/profiles/', {'profile_image': profile_image})
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_profile_image_fail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url+'1/profiles/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class MemberModelTest(TestCase):
    fixtures = ["core/data/test/people.json", "core/data/initial/majors.json"]

    def setUp(self):
        self.member = Member.objects.get(student_id='2024-12345')
        self.user = User.objects.get(member=self.member)

    def test_str(self):
        person = Member.objects.get(pk=1)
        expected_str = "홍길동 (2024)"
        self.assertEqual(str(person), expected_str)

class MemberUtilTest(TestCase):
    def test_get_status_choice(self):
        self.assertEqual(get_status_choice("활동중"), 1)
        self.assertEqual(get_status_choice("비활동"), 2)
        self.assertEqual(get_status_choice("군입대"), 3)
        self.assertEqual(get_status_choice("OB"), 4)
        self.assertEqual(get_status_choice("기타"), 9)
        self.assertEqual(get_status_choice("asdf"), 0)

    def test_get_role_choice(self):
        self.assertEqual(get_role_choice("주장"), 1)
        self.assertEqual(get_role_choice("부주장"), 2)
        self.assertEqual(get_role_choice("수석매니저"), 3)
        self.assertEqual(get_role_choice("매니저"), 4)
        self.assertEqual(get_role_choice("선수"), 5)
        self.assertEqual(get_role_choice("지도자"), 6)
        self.assertEqual(get_role_choice("기타"), 9)
        self.assertEqual(get_role_choice("asdf"), 0)

    def test_get_hands_choice(self):
        self.assertEqual(get_hands_choice("우투우타"), 1)
        self.assertEqual(get_hands_choice("우투좌타"), 2)
        self.assertEqual(get_hands_choice("좌투우타"), 3)
        self.assertEqual(get_hands_choice("좌투좌타"), 4)
        self.assertEqual(get_hands_choice("양투우타"), 5)
        self.assertEqual(get_hands_choice("양투좌타"), 6)
        self.assertEqual(get_hands_choice("우투양타"), 7)
        self.assertEqual(get_hands_choice("좌투양타"), 8)
        self.assertEqual(get_hands_choice("양투양타"), 9)
        self.assertEqual(get_hands_choice("asdf"), 0)

    @patch('person.member.utils.get_presigned_url')
    def test_get_profile_image_url(self, mock_get_presigned_url):
        mock_image = generate_test_image_file()
        mock_image.name = 'person.png'
        mock_get_presigned_url.return_value = 'http://test.com'
        self.assertEqual(
            get_profile_image_url(None),
            'https://kr.object.ncloudstorage.com/snubaseball.test/profiles/person.png'
        )
        self.assertEqual(get_profile_image_url(mock_image), 'http://test.com')
