from core.test import SNUBaseballTestCase
from member.person.models import Member


class StudentIdCheckViewTest(SNUBaseballTestCase):
    def setUp(self):
        self.member = Member.objects.get(name="홍길동")
        self.valid_student_id = "2025-12345"
        self.already_registered_student_id = "2020-12345"

    def test_id_check_success(self):
        response = self.client.post(
            "/api/v1/register/sid/",
            {"student_id": self.valid_student_id},
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["member_id"], self.member.id)
        self.assertEqual(
            response.data["name"], f"{self.member.name} ({self.member.admission_year})"
        )

    def test_id_check_nonexistent_student_id(self):
        response = self.client.post(
            "/api/v1/register/sid/",
            {"student_id": "9999-99999"},
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data["message"], "학번이 존재하지 않습니다. 주장단에 문의해주세요."
        )

    def test_id_check_already_registered(self):
        response = self.client.post(
            "/api/v1/register/sid/",
            {"student_id": self.already_registered_student_id},
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["message"], "이미 가입된 학번입니다.")

    def test_id_check_empty_student_id(self):
        response = self.client.post(
            "/api/v1/register/sid/",
            {"student_id": ""},
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["message"], "학번을 입력해주세요.")
