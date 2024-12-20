from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from .models import College, Department

class MajorViewSetTest(APITestCase):
    fixtures = ["core/data/initial/majors.json"]

    def test_unallowed_methods(self):
        response = self.client.get('/v1/majors/1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_list(self):
        response = self.client.get('/v1/majors/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CollegeModelTest(TestCase):
    def test_str(self):
        college = College.objects.create(name='컴퓨터공학과', short_name='컴공')
        self.assertEqual(str(college), '컴퓨터공학과')

class DepartmentModelTest(TestCase):
    def test_str(self):
        college = College.objects.create(name='컴퓨터공학과', short_name='컴공')
        department = Department.objects.create(name='소프트웨어학과', short_name='소프', college=college)
        self.assertEqual(str(department), '소프트웨어학과')
