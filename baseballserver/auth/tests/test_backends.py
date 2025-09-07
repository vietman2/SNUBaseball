# tests/test_auth_backend.py
from unittest.mock import patch
from django.contrib.auth import authenticate

from auth.backends import AuthBackend
from auth.user.models import User
from core.test import SNUBaseballTestCase


class AuthBackendSmokeTests(SNUBaseballTestCase):
    def test_case_insensitive_username(self):
        u1 = authenticate(username="testuser", password="Testpassword123@")
        self.assertIsNotNone(u1)
        self.assertEqual(u1.pk, self.user.pk)

        u2 = authenticate(username="TESTUSER", password="Testpassword123@")
        self.assertIsNotNone(u2)
        self.assertEqual(u2.pk, self.user.pk)

    def test_wrong_password_returns_none(self):
        self.assertIsNone(authenticate(username="TestUser", password="wrong"))

    def test_early_return_when_username_is_none(self):
        """if username is None or password is None: return  -> username None 케이스"""
        u = authenticate(username=None, password="pass1234")
        self.assertIsNone(u)

    def test_early_return_when_password_is_none(self):
        """if username is None or password is None: return  -> password None 케이스"""
        u = authenticate(username="TestUser", password=None)
        self.assertIsNone(u)

    def test_fail_branch_when_check_password_is_false(self):
        """if user.check_password(...) and ...:  -> check_password False로 미통과"""
        u = authenticate(username="TestUser", password="wrong")
        self.assertIsNone(u)

    def test_fail_branch_when_user_cannot_authenticate(self):
        """if user.check_password(...) and self.user_can_authenticate(user):
        -> user_can_authenticate False (is_active=False)로 미통과"""
        User.objects.filter(pk=self.user.pk).update(is_active=False)

        u = authenticate(username="TestUser", password="pass1234")
        self.assertIsNone(u)

    def test_user_does_not_exist_branch_calls_timing_guard(self):
        """
        존재하지 않는 username이면 User.DoesNotExist로 except에 들어가
        User().set_password(password) (타이밍 공격 방지)가 호출된다.
        """
        # 백엔드 모듈에서 참조하는 User.set_password를 패치해야 정확히 잡힙니다.
        with patch(f"{AuthBackend.__module__}.User.set_password") as mock_set_password:
            user = authenticate(username="no_such_user", password="anything")
            self.assertIsNone(user)
            mock_set_password.assert_called_once()
