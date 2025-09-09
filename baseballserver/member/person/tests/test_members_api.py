from auth.user.models import User
from core.test import SNUBaseballTestCase


class MembersAPITestCase(SNUBaseballTestCase):
    def test_get_members_list(self):
        res = self.client.get("/api/v1/members/")
        self.assertEqual(res.status_code, 200)

    def test_member_details(self):
        res = self.client.get("/api/v1/members/1/")
        self.assertEqual(res.status_code, 200)
