from django.test import TestCase

from auth.member.models import Member, MemberRole, MemberStatus
from ..models import User


class UserCreationTestCase(TestCase):
    fixtures = [
        "data/initial/majors.json",
        "data/initial/member_roles.json",
        "data/initial/member_status.json",
    ]

    def setUp(self):
        role = MemberRole.objects.get(name="주장")
        status = MemberStatus.objects.get(name="ACTIVE")
        Member.objects.create(
            student_id="2017-19331",
            first_name="John",
            last_name="Doe",
            admission_year=2017,
            role=role,
            status=status,
        )

    def test_create_superuser(self):
        user = User.objects.create_superuser(
            username="superadmin",
            password="password123",
        )

        self.assertTrue(user.is_superuser)
