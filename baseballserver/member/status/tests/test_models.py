from django.test import TestCase

from ..models import MemberStatus


class MemberStatusModelTest(TestCase):
    def test_str(self):
        status = MemberStatus(name="Active")
        self.assertEqual(str(status), "Active")
