from django.test import TestCase

from ..models import College, Department


class MajorModelsTestCase(TestCase):
    def setUp(self):
        self.college = College.objects.create(name="Test University", short_name="TU")
        self.department = Department.objects.create(
            name="Computer Science", short_name="CS", college=self.college
        )

    def test_college_str(self):
        self.assertEqual(str(self.college), "Test University")

    def test_department_str(self):
        self.assertEqual(str(self.department), "Computer Science")
