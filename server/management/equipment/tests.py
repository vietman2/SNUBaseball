from rest_framework import status
from rest_framework.test import APITestCase

from person.user.models import User

class EquipmentAPITestCase(APITestCase):
    fixtures = [
        "core/data/test/equipment.json", "core/data/initial/majors.json",
        "core/data/test/people.json"
    ]

    def setUp(self):
        self.url = '/v1/equipment/'
        self.user = User.objects.get(username='testuser_1')
        self.person_in_charge = User.objects.get(username='testuser_3')

    def test_unauthorized(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.put(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url, {'location': "전체"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(self.url, {'location': "아카데미"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(self.url, {'location': "창고"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(self.url, {'location': "부실"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(self.url, {'location': "기타"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.client.force_authenticate(user=self.person_in_charge)
        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_tips(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(f'{self.url}1/', {
            'management_tips': '장비 사용 팁 업데이트'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_tips_fail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_quantity(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(f'{self.url}1/quantity/', {
            'equipment_id': 1,
            'quantity': 10,
            'notes': '수량 업데이트 테스트'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_quantity_fail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(f'{self.url}1/quantity/', {
            'equipment_id': 1,
            'quantity': 10,
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_managers(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(f'{self.url}1/managers/', {
            'manager_ids': [1, 2]
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_managers_fail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(f'{self.url}1/managers/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_add_new_equipment(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(f'{self.url}1/new/', {
            'name': '테스트 장비',
            'category': 1,
            'location': 1,
            'quantity': 10,
            'unit': '개',
            'notes': '테스트 장비 추가'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_add_new_equipment_fail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(f'{self.url}1/new/', {
            'name': '테스트 장비',
            'category': 1,
            'location': 1,
            'quantity': 10,
            'unit': '개',
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
