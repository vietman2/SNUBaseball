from django.test import TestCase

from ..models import Member, MemberRole, MemberStatus


class MemberModelsTestCase(TestCase):
    fixtures = [
        "data/initial/majors.json",
        "data/initial/member_roles.json",
        "data/initial/member_status.json",
        "data/test/auth.json",
    ]

    def setUp(self):
        self.admin = Member.objects.get(student_id="2020-12345")
        self.role_captain = MemberRole.objects.get(name="주장")
        self.status_active = MemberStatus.objects.get(label="활동중")

    def test_member_str(self):
        self.assertEqual(str(self.admin), "관리자 (2020)")

    def test_member_role(self):
        self.assertEqual(str(self.role_captain), "주장")

    def test_member_status(self):
        self.assertEqual(str(self.status_active), "ACTIVE")
