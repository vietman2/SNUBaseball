from auth.user.models import User
from core.test import SNUBaseballTestCase
from member.person.models import Member


class AuthTest(SNUBaseballTestCase):
    def setUp(self):
        member = Member.objects.get(name="홍길동")
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword",
            member=member,
        )

    def test_login_logout(self):
        login_res = self.client.post(
            "/api/v1/login/", {"username": "testuser", "password": "testpassword"}
        )

        refresh = login_res.cookies["x_snubaseball_ref_tok"].value

        self.assertEqual(login_res.status_code, 200)
        self.assertIn("access", login_res.data)
        self.assertNotIn("refresh", login_res.data)

        refresh_res = self.client.post(
            "/api/v1/tokens/refresh/",
            **{"HTTP_COOKIE": f"x_snubaseball_ref_tok={refresh}"},
        )

        self.assertEqual(refresh_res.status_code, 200)
        self.assertIn("access", refresh_res.data)
        self.assertNotIn("refresh", refresh_res.data)

        new_refresh = refresh_res.cookies["x_snubaseball_ref_tok"].value

        logout_res = self.client.post(
            "/api/v1/logout/",
            **{"HTTP_COOKIE": f"x_snubaseball_ref_tok={new_refresh}"},
        )

        self.assertEqual(logout_res.status_code, 200)

    def test_login_invalid(self):
        login_res = self.client.post(
            "/api/v1/login/", {"username": "testuser", "password": "wrongpassword"}
        )

        self.assertEqual(login_res.status_code, 401)

    def test_login_inactive(self):
        self.user.is_active = False
        self.user.save()

        login_res = self.client.post(
            "/api/v1/login/", {"username": "testuser", "password": "testpassword"}
        )

        self.assertEqual(login_res.status_code, 401)

    def test_logout_no_cookie(self):
        logout_res = self.client.post("/api/v1/logout/")

        self.assertEqual(logout_res.status_code, 401)

    def test_logout_invalid_cookie(self):
        logout_res = self.client.post(
            "/api/v1/logout/",
            **{"HTTP_COOKIE": "x_snubaseball_ref_tok=invalidtoken"},
        )

        self.assertEqual(logout_res.status_code, 401)

    def test_refresh_no_cookie(self):
        refresh_res = self.client.post("/api/v1/tokens/refresh/")

        self.assertEqual(refresh_res.status_code, 401)

    def test_refresh_invalid_cookie(self):
        refresh_res = self.client.post(
            "/api/v1/tokens/refresh/",
            **{"HTTP_COOKIE": "x_snubaseball_ref_tok=invalidtoken"},
        )

        self.assertEqual(refresh_res.status_code, 401)
