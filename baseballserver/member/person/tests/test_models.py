from django.test import TestCase

from ..models import Member

class MemberModelTest(TestCase):
    def test_str(self):
        member = Member(name="John Doe", admission_year=2020)
        self.assertEqual(str(member), "John Doe (2020)")
