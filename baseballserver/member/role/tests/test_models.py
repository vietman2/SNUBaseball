from django.test import TestCase

from ..models import MemberRole


class MemberRoleModelTest(TestCase):
    def test_str(self):
        role = MemberRole(name="Team Captain")
        self.assertEqual(str(role), "Team Captain")
