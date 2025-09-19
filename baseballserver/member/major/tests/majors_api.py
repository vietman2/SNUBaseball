from core.test import SNUBaseballTestCase


class MajorsAPITestCase(SNUBaseballTestCase):
    def test_get_major_detail(self):
        response = self.client.get("/api/v1/majors/1/")
        self.assertEqual(response.status_code, 405)

    def test_get_majors(self):
        response = self.client.get("/api/v1/majors/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 15)
