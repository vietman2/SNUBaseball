from django.test import TestCase

from ..models import User


class UserModelTestCase(TestCase):
    fixtures = [
        "data/initial/majors.json",
        "data/initial/member_roles.json",
        "data/initial/member_status.json",
        "data/test/auth.json",
    ]

    def setUp(self):
        self.user = User.objects.get(username="admin")

    def test_user_str(self):
        self.assertEqual(str(self.user), self.user.username)

    def test_has_perm(self):
        self.assertTrue(self.user.has_perm("auth.change_user"))

    def test_has_module_perms(self):
        self.assertTrue(self.user.has_module_perms("auth"))
