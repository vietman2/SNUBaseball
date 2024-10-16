from rest_framework.test import APITestCase
from rest_framework import status

from media.image.models import Image as ImageModel
from person.member.models import Member
from .models import User

class UserProfileAPITestCase(APITestCase):
    fixtures = ["core/data/test/mock_image.json", "core/data/test/people.json"]

    def setUp(self):
        self.url = '/api/profiles/'
        self.image = ImageModel.objects.get(pk=1)
        self.member = Member.objects.get(student_id='2024-12345')
        self.member2 = Member.objects.get(student_id='2023-12345')
        self.member3 = Member.objects.get(student_id='2022-12345')
        self.user = User.objects.create(
            username='testuser2',
            member=self.member,
            is_superuser=True
        )
        self.user2 = User.objects.create(
            username='testuser3',
            member=self.member2
        )
        self.user3 = User.objects.get(member=self.member3)

    def test_unallowed_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_profile_success(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'{self.url}{self.user.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.force_authenticate(user=self.user2)
        response = self.client.get(f'{self.url}{self.user2.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.force_authenticate(user=self.user3)
        response = self.client.get(f'{self.url}{self.user3.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_profile_fail_not_logged_in(self):
        response = self.client.get(f'{self.url}{self.user.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_profile_fail_not_self(self):
        self.client.force_authenticate(user=self.user2)
        response = self.client.get(f'{self.url}{self.user.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class StudentIdCheckAPITestCase(APITestCase):
    fixtures = ["core/data/test/mock_image.json", "core/data/test/people.json"]

    def setUp(self):
        self.url = '/api/student_id/'
        self.member = Member.objects.get(student_id='2024-12345')
        self.member2 = Member.objects.get(student_id='2023-12345')
        self.user = User.objects.create(
            username='testuser2',
            member=self.member2
        )

    def test_student_id_check_success(self):
        response = self.client.get(f'{self.url}?student_id={self.member.student_id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_student_id_check_fail(self):
        response = self.client.get(f'{self.url}?student_id=2024-12346')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '학번이 존재하지 않습니다. 주장단에 문의해주세요.')

    def test_student_id_check_no_student_id(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '학번을 입력해주세요.')

    def test_student_id_check_already_registered(self):
        response = self.client.get(f'{self.url}?student_id={self.member2.student_id}')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '이미 가입된 학번입니다.')

class RegisterAPITestCase(APITestCase):
    fixtures = ["core/data/test/mock_image.json", "core/data/test/people.json"]

    def setUp(self):
        self.url = '/api/register/'
        self.member = Member.objects.get(student_id='2024-12345')
        self.member2 = Member.objects.get(student_id='2023-12345')
        self.data = {
            'member_id': self.member.id,
            'username': 'testuser2',
            'password': 'testpassword123!',
            'password2': 'testpassword123!'
        }

    def test_register_success(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_fail(self):
        self.data['password2'] = 'testpassword'
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '비밀번호가 일치하지 않습니다.')

    def test_register_no_member_id(self):
        self.data['member_id'] = -1
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '회원 정보가 존재하지 않습니다.')

        self.data.pop('member_id')
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '오류가 발생했습니다.')

    def test_register_no_username(self):
        self.data['username'] = ''
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '아이디를 입력해주세요.')

        self.data.pop('username')
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '아이디를 입력해주세요.')

    def test_register_invalid_username(self):
        # 1. username is too long
        self.data["username"] = "a" * 151
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # 2. username contains invalid characters
        self.data["username"] = "test!"
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # 3. username is already in use
        self.data["member_id"] = self.member2.id
        self.data["username"] = "testuser"
        self.client.post(self.url, data=self.data)
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_no_password(self):
        self.data['password'] = ''
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '비밀번호를 입력해주세요.')

        self.data.pop('password')
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '비밀번호를 입력해주세요.')

    def test_register_no_password2(self):
        self.data['password2'] = ''
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.data.pop('password2')
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '비밀번호 확인을 입력해주세요.')

    def test_register_passwords_not_match(self):
        self.data['password2'] = 'testpassword1234!'
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], '비밀번호가 일치하지 않습니다.')

    def test_register_fail_password(self):
        # 1. password is not matched
        self.data["password2"] = "test1"
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # 2. password is too short
        self.data["password"] = "test"
        self.data["password2"] = "test"
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # 3. password doesn't contain alphabets
        self.data["password"] = "12341234!!"
        self.data["password2"] = "12341234!!"
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # 4. password doesn't contain numbers
        self.data["password"] = "asdfasdf!!"
        self.data["password2"] = "asdfasdf!!"
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # 5. password doesn't contain special characters
        self.data["password"] = "asdfasdf1234"
        self.data["password2"] = "asdfasdf1234"
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
