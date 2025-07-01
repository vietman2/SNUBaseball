from auth.member.models import Member
from auth.user.models import User
from core.tests import BaseAPITestCase
from ..backends import AuthBackend


class AuthBackendTestCase(BaseAPITestCase):
    """
    로그인 시도를 하여 인증 백엔드가 올바르게 작동하는지 테스트.
    """

    def setUp(self):
        super().setUp()
        member = Member.objects.get(student_id="2025-12345")
        self.new_user = User.objects.create_user(
            username="new_user", password="secret", member=member
        )
        self.backend = AuthBackend()

    def test_auth_backend_success(self):
        """
        기본 테스트
        """
        original_last_login = self.admin.last_login

        authenticated = self.backend.authenticate(
            None, username="new_user", password="secret"
        )
        self.assertIsNotNone(authenticated)
        self.assertEqual(authenticated, self.new_user)

        self.new_user.refresh_from_db()
        self.assertNotEqual(self.new_user.last_login, original_last_login)

    def test_auth_backend_blocked_user(self):
        """
        차단된 유저는 인증되지 않아야 함.
        """
        self.new_user.is_blocked = True
        self.new_user.save()

        authenticated = self.backend.authenticate(
            None, username="new_user", password="secret"
        )
        self.assertIsNone(authenticated)
