import types
import pytest
from django.contrib.auth.models import AnonymousUser

from core.auth import IsAuthenticated, IsOps
from tests.factories import UserFactory

pytestmark = pytest.mark.django_db


def _req(user):
    request = types.SimpleNamespace()
    request.user = user
    request.headers = {}
    return request


def _req_with_header(user, header_value):
    request = types.SimpleNamespace()
    request.user = user
    request.headers = {"X-SNUBASEBALL-CLIENT": header_value}
    return request


def test_is_authenticated_false_if_no_header():
    user = UserFactory(is_active=True)
    perm = IsAuthenticated()
    assert perm.has_permission(_req(user), view=None) is False


def test_is_authenticated_false_if_wrong_header():
    user = UserFactory(is_active=True)
    perm = IsAuthenticated()
    assert (
        perm.has_permission(_req_with_header(user, "wrong_client"), view=None) is False
    )


def test_is_authenticated_true_for_active_user():
    user = UserFactory(is_active=True)
    perm = IsAuthenticated()
    assert (
        perm.has_permission(
            _req_with_header(user, "snu-baseball-team-portal"), view=None
        )
        is True
    )


def test_is_authenticated_false_for_anonymous():
    perm = IsAuthenticated()
    assert (
        perm.has_permission(
            _req_with_header(AnonymousUser(), "snu-baseball-team-portal"), view=None
        )
        is False
    )


def test_is_authenticated_false_for_inactive_user():
    user = UserFactory(is_active=False)
    perm = IsAuthenticated()
    assert (
        perm.has_permission(
            _req_with_header(user, "snu-baseball-team-portal"), view=None
        )
        is False
    )


def test_is_admin_true_for_superuser():
    user = UserFactory(is_superuser=True)
    perm = IsOps()
    assert (
        perm.has_permission(
            _req_with_header(user, "snu-baseball-team-portal"), view=None
        )
        is True
    )


def test_is_admin_false_for_non_superuser():
    user = UserFactory(is_superuser=False)
    perm = IsOps()
    assert (
        perm.has_permission(
            _req_with_header(user, "snu-baseball-team-portal"), view=None
        )
        is False
    )


def test_is_admin_false_when_inactive_superuser():
    user = UserFactory(is_superuser=True, is_active=False)
    perm = IsOps()
    assert (
        perm.has_permission(
            _req_with_header(user, "snu-baseball-team-portal"), view=None
        )
        is False
    )
