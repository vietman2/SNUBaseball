import pytest
from django.contrib.auth import get_user_model

from tests.factories import MemberFactory

pytestmark = pytest.mark.django_db

User = get_user_model()


def test_user_manager_create_user():
    member = MemberFactory(student_id="2023-12345")
    user = User.objects.create_user(
        username="testuser", password="testpass", member=member
    )
    assert user.username == "testuser"
    assert user.check_password("testpass") is True
    assert user.is_active is True
    assert user.is_superuser is False
    assert user.is_staff is False


def test_user_manager_create_superuser():
    ## 테스트를 위해 MemberFactory로 2017-19331 학번의 부원 생성
    MemberFactory(student_id="2017-19331")
    user = User.objects.create_superuser(username="admin", password="adminpass")
    assert user.username == "admin"
    assert user.check_password("adminpass") is True
    assert user.is_active is True
    assert user.is_superuser is True
    assert user.is_staff is True
