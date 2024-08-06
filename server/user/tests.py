from django.core.management import call_command
from rest_framework.test import APITestCase
from rest_framework import status

from user.models import User

class RegisterAPITestCase(APITestCase):
    def setUp(self):
        self.url = "/api/register/"
        self.data = {
            "username": "test",
            "first_name": "test",
            "last_name": "test",
            "email": "test@test.com",
            "phone_number": "010-1234-5678",
            "password": "passpass1234!",
            "password2": "passpass1234!",
        }
        self.data2 = {
            "username": "test",
            "first_name": "test2",
            "last_name": "test2",
            "email": "test2@test.com",
            "phone_number": "010-1234-5679",
            "password": "passpass12345!",
            "password2": "passpass12345!",
        }

    def test_unallowed_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.put(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.patch(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_register_success(self):
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        created_user = User.objects.get()
        self.assertEqual(created_user.username, "test")

        # 비밀번호가 암호화되어 저장되었는지 확인
        self.assertNotEqual(created_user.password, "passpass1234")

        # 디폴트 값들이 잘 들어갔는지 확인
        self.assertEqual(created_user.is_active, True)
        self.assertEqual(created_user.is_superuser, False)

    def test_register_success_superuser(self):
        call_command(
            "createsuperuser",
            username="admin",
            email="admin@test.com",
            phone_number="010-1234-1234",
            interactive=False,
        )
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().is_superuser, True)

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

    def test_register_fail_email(self):
        # 1. email is not valid
        self.data["email"] = "test"
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # 2. email is already in use
        self.data["email"] = "test@test.com"
        self.client.post(self.url, data=self.data)
        self.data2["email"] = "test@test.com"
        response = self.client.post(self.url, data=self.data2)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_fail_username(self):
        # 1. username is too long
        self.data["username"] = "verylong1234verylong1234verylong1234 \
                                    verylong1234verylong1234verylong1234 \
                                    verylong1234verylong1234verylong1234 \
                                    verylong1234verylong1234verylong1234verylong1234"
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # 2. username contains invalid characters
        self.data["username"] = "test!"
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # 3. username is already in use
        self.client.post(self.url, data=self.data)
        self.data2["username"] = "test"
        response = self.client.post(self.url, data=self.data2)

    def test_register_fail_phonenumber(self):
        # 1. phone number is not valid
        self.data["phone_number"] = "test"
        response = self.client.post(self.url, data=self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # 2. phone number is already in use
        self.data["phone_number"] = "010-1234-5678"
        self.client.post(self.url, data=self.data)
        self.data2["phone_number"] = "010-1234-5678"
        response = self.client.post(self.url, data=self.data2)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_fail_emptyfields(self):
        response = self.client.post(self.url, data={})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.post(self.url, data={"username": "test"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
