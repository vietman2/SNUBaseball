import pytest
from django.contrib.auth import get_user_model

from core.auth import AuthBackend
from tests.factories import UserFactory

pytestmark = pytest.mark.django_db

User = get_user_model()


def test_auth_success_with_username_param():
    raw_pw = "Pw!23456"
    u = UserFactory(username="user", password=raw_pw)

    backend = AuthBackend()
    authed = backend.authenticate(request=None, username="user", password=raw_pw)

    assert authed is not None
    assert authed.pk == u.pk


def test_auth_success_case_insensitive_username():
    raw_pw = "Pw!23456"
    u = UserFactory(username="Captain", password=raw_pw)

    backend = AuthBackend()
    authed = backend.authenticate(request=None, username="CAPTAIN", password=raw_pw)

    assert authed is not None
    assert authed.pk == u.pk


def test_auth_fail_wrong_password():
    UserFactory(username="park", password="Correct#123")

    backend = AuthBackend()
    authed = backend.authenticate(request=None, username="park", password="Wrong#123")

    assert authed is None


def test_auth_fail_inactive_user():
    raw_pw = "Pw!23456"
    UserFactory(username="lee", password=raw_pw, is_active=False)

    backend = AuthBackend()
    authed = backend.authenticate(request=None, username="lee", password=raw_pw)

    # ModelBackend.user_can_authenticate를 따라 is_active=False면 인증 실패
    assert authed is None


def test_auth_fail_missing_username_or_password():
    raw_pw = "Pw!23456"
    UserFactory(username="choi", password=raw_pw)

    backend = AuthBackend()

    assert backend.authenticate(request=None, username="choi", password=None) is None
    assert backend.authenticate(request=None, username=None, password=raw_pw) is None


def test_auth_user_not_found_returns_none_does_not_create_user():
    before = User.objects.count()

    backend = AuthBackend()
    authed = backend.authenticate(request=None, username="no_such_user", password="x")

    after = User.objects.count()
    assert authed is None
    assert after == before
