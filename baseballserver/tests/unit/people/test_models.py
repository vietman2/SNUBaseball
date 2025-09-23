import pytest
from django.contrib.auth import get_user_model

from apps.people.members.models import MemberRole, MemberStatus, College, Department
from tests.factories import MemberFactory, UserFactory

pytestmark = pytest.mark.django_db

User = get_user_model()


def test_member_str():
    member = MemberFactory(name="John Doe", admission_year=2025)
    assert str(member) == "John Doe (2025)"


def test_member_role_str():
    role = MemberRole.objects.get(name="선수")
    assert str(role) == "선수"


def test_member_status_str():
    status = MemberStatus.objects.get(name="ACTIVE")
    assert str(status) == "ACTIVE"


def test_major_str():
    col = College.objects.get(name="인문대학")
    dept = Department.objects.get(name="국어국문학과")
    assert str(col) == "인문대학"
    assert str(dept) == "국어국문학과"


def test_user_str():
    user = UserFactory.create_normal_account()
    assert str(user) == user.username
    assert user.member is not None


def test_user_other_methods():
    user = UserFactory.create_normal_account()
    assert user.is_active is True
    assert user.is_superuser is False
    assert user.is_staff is False
    assert user.has_perm("any_perm") is False
    assert user.has_module_perms("any_module") is False
