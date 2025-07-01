from rest_framework import status

from core.tests import BaseAPITestCase
from ..models import User


class RegisterTestCase(BaseAPITestCase):
    def setUp(self):
        self.url = "/api/signup/"
        self.valid_data = {
            "username": "testuser",
            "password": "Test@1234",
            "password2": "Test@1234",
            "member": 2,
            "student_id": "2025-12345",
        }

    def test_register_success(self):
        response = self.client.post(self.url, self.valid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "회원가입이 완료되었습니다.")
        self.assertTrue(
            User.objects.filter(username=self.valid_data["username"]).exists()
        )

    def test_register_member_already_registered(self):
        data = self.valid_data.copy()
        data["member"] = 1

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "이미 가입된 학번입니다.")

    def test_register_password_mismatch(self):
        data = self.valid_data.copy()
        data["password2"] = "Different@1234"

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "비밀번호가 일치하지 않습니다.")

    def test_register_invalid_member(self):
        data = self.valid_data.copy()
        data["member"] = 2
        data["student_id"] = "2025-54321"

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "학번이 일치하지 않습니다.")
