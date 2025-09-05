from auth.user.models import User
from core.test import SNUBaseballTestCase

class MeAPITest(SNUBaseballTestCase):
    def setUp(self):
        self.user = User.objects.get(username="admin")

    def test_me(self):
        self.client.force_login(user=self.user)

        me_res = self.client.get("/api/v1/me/")
        self.assertEqual(me_res.status_code, 200)
        self.assertEqual(me_res.data["username"], "adm****")

    def test_me_unauthenticated(self):
        me_res = self.client.get("/api/v1/me/")

        self.assertEqual(me_res.status_code, 403)
