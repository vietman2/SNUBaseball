from django.test import TestCase

from auth.user.models import User
from member.person.models import Member


class UserModelTest(TestCase):
    fixtures = [
        "data/initial/majors.json",
        "data/initial/member_meta.json",
        "data/test/auth.json",
    ]

    def setUp(self):
        self.member = Member.objects.get(name="홍길동")
        self.admin = Member.objects.create(
            student_id="2017-19331", admission_year=2017, role_id=1, status_id=1
        )

    def test_create_user(self):
        user = User.objects.create_user(
            username="testuser",
            password="testpassword",
            member=self.member,
        )
        self.assertEqual(user.username, "testuser")
        self.assertTrue(user.check_password("testpassword"))
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)

    def test_create_superuser(self):
        superuser = User.objects.create_superuser(password="superpassword")
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.check_password("superpassword"))

        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.has_perm("any_permission"))
        self.assertTrue(superuser.has_module_perms("any_app"))
