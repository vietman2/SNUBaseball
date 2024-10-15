from rest_framework.test import APITestCase
from rest_framework import status

from person.member.models import Member
from person.user.models import User

class StudentIdCheckAPITestCase(APITestCase):
    def setUp(self):
        self.url = '/api/student_id/'
        self.member = Member.objects.create(
            student_id='2024-12345',
            first_name='홍',
            last_name='길동',
            phone='01012345678',
            admission_year=2024
        )
        self.member2 = Member.objects.create(
            student_id='2023-12345',
            first_name='김',
            last_name='철수',
            phone='01098765432',
            admission_year=2023
        )
        self.user = User.objects.create(
            username='testuser',
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
    def setUp(self):
        self.url = '/api/register/'
        self.member = Member.objects.create(
            student_id='2024-12345',
            first_name='홍',
            last_name='길동',
            phone='01012345678',
            admission_year=2024
        )
        self.data = {
            'member_id': self.member.id,
            'username': 'testuser',
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
