from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from person.user.models import User
from .enums import TransactionCategory, TransactionMethod, TransactionType
from .utils import get_category, get_method, get_type

class TransactionsAPITestCase(APITestCase):
    fixtures = [
        "core/data/test/accountings.json", "core/data/test/people.json",
        "core/data/initial/majors.json"
    ]

    def setUp(self):
        self.url = '/v1/transactions/'
        self.admin = User.objects.get(username='testuser_1')
        self.create_data = {
            "account_id": 1,
            "amount": 1000000,
            "date": "2025-01-01",
            "description": "test",
            "type": "수입",
            "category": "기타",
            "method": "현금",
            "counter_party": "test",
            "notes": "test"
        }

    def test_list(self):
        self.client.force_authenticate(self.admin)
        ## no query
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## with queries
        response = self.client.get(f"{self.url}?month=2025-01&account=1&type=수입&query=test")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve(self):
        self.client.force_authenticate(self.admin)
        response = self.client.get(f"{self.url}1/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):
        ## oldest
        self.client.force_authenticate(self.admin)
        response = self.client.post(self.url, self.create_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        ## new
        self.create_data['account_id'] = 2
        self.create_data['date'] = "2025-01-14"
        response = self.client.post(self.url, self.create_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid(self):
        self.client.force_authenticate(self.admin)
        response = self.client.post(self.url, {})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update(self):
        ## edit other fields
        self.client.force_authenticate(self.admin)
        response = self.client.put(f"{self.url}1/", self.create_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## edit amount
        self.create_data['amount'] = 20000
        response = self.client.put(f"{self.url}1/", self.create_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_invalid(self):
        self.client.force_authenticate(self.admin)
        response = self.client.put(f"{self.url}1/", {})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_destroy(self):
        self.client.force_authenticate(self.admin)
        response = self.client.delete(f"{self.url}1/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class TransactionsUtilsTestCase(TestCase):
    def test_get_category(self):
        self.assertEqual(get_category("식비"), TransactionCategory.FOOD)
        self.assertEqual(get_category("교통비"), TransactionCategory.TRANSPORTATION)
        self.assertEqual(get_category("숙박비"), TransactionCategory.ACCOMMODATION)
        self.assertEqual(get_category("야구용품비"), TransactionCategory.SUPPLIES)
        self.assertEqual(get_category("선수등록비"), TransactionCategory.REGISTRATION)
        self.assertEqual(get_category("기타"), TransactionCategory.OTHER)

    def test_get_method(self):
        self.assertEqual(get_method("카드"), TransactionMethod.CARD)
        self.assertEqual(get_method("계좌이체"), TransactionMethod.TRANSFER)
        self.assertEqual(get_method("현금"), TransactionMethod.OTHER)

    def test_get_type(self):
        self.assertEqual(get_type("수입"), TransactionType.INCOME)
        self.assertEqual(get_type("지출"), TransactionType.OUTCOME)
