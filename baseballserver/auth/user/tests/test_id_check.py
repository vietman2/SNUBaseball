from core.tests import BaseAPITestCase

from auth.member.models import Member, MemberRole, MemberStatus


class StudentIdCheckViewTestCase(BaseAPITestCase):
    def setUp(self):
        super().setUp()
        self.url = "/api/student_id/"
        self.new_member = Member.objects.create(
            student_id="2017-19331",
            first_name="John",
            last_name="Doe",
            admission_year=2017,
            role=MemberRole.objects.get(name="선수"),
            status=MemberStatus.objects.get(name="ACTIVE"),
        )

    def test_valid_student_id(self):
        ## 회원가입 가능한 학번
        response = self.client.post(
            self.url, {"student_id": self.new_member.student_id}
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("name", response.data)
        self.assertIn("member_id", response.data)

    def test_existing_user(self):
        ## 이미 가입된 학번
        response = self.client.post(
            self.url, {"student_id": self.admin.member.student_id}
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("이미 가입된 학번입니다.", str(response.data))

    def test_no_data_in_request(self):
        ## 학번이 없는 경우
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, 400)
        self.assertIn("학번을 입력해주세요.", str(response.data))

    def test_non_existent_student_id(self):
        ## 존재하지 않는 학번
        response = self.client.post(self.url, {"student_id": "9999-99999"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("학번이 존재하지 않습니다.", str(response.data))
