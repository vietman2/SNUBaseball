from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from person.user.models import User
from .models import Account

class AccountsAPITestCase(APITestCase):
    fixtures = [
        "core/data/test/accountings.json", "core/data/test/people.json",
        "core/data/initial/majors.json"
    ]

    def setUp(self):
        self.url = '/v1/accounts/'
        self.admin = User.objects.get(username='testuser_1')

    def test_unallowed_method(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url + '1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_list(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class AccountModelTestCase(TestCase):
    fixtures = ["core/data/test/accountings.json"]

    def setUp(self):
        self.account = Account.objects.get(pk=1)

    def test_str(self):
        self.assertEqual(str(self.account), self.account.name)
