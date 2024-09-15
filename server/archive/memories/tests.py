from rest_framework.test import APITestCase

class MemoriesAPITestCase(APITestCase):
    fixtures = ['data/test/memories.json']

    def setUp(self):
        self.url = '/api/memories/'

    def test_get_memories(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 4)
