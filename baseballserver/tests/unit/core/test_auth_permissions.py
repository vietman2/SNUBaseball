import types
import pytest
from django.contrib.auth.models import AnonymousUser

from core.auth import IsAuthenticated, IsAdmin
from tests.factories import UserFactory

pytestmark = pytest.mark.django_db


def _req(user):
    return types.SimpleNamespace(user=user)


def test_is_authenticated_true_for_active_user():
    user = UserFactory(is_active=True)
    perm = IsAuthenticated()
    assert perm.has_permission(_req(user), view=None) is True


def test_is_authenticated_false_for_anonymous():
    perm = IsAuthenticated()
    assert perm.has_permission(_req(AnonymousUser()), view=None) is False


def test_is_authenticated_false_for_inactive_user():
    user = UserFactory(is_active=False)
    perm = IsAuthenticated()
    assert perm.has_permission(_req(user), view=None) is False


def test_is_admin_true_for_superuser():
    user = UserFactory(is_superuser=True)
    perm = IsAdmin()
    assert perm.has_permission(_req(user), view=None) is True


def test_is_admin_false_for_non_superuser():
    user = UserFactory(is_superuser=False)
    perm = IsAdmin()
    assert perm.has_permission(_req(user), view=None) is False


def test_is_admin_false_when_inactive_superuser():
    user = UserFactory(is_superuser=True, is_active=False)
    perm = IsAdmin()
    assert perm.has_permission(_req(user), view=None) is False
