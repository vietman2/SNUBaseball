import pytest

from apps.people.users.validators import UsernameValidator
from core.error_handling import SNUBaseballException
from tests.factories import UserFactory

pytestmark = pytest.mark.django_db


def test_username_valid_when_all_rules_met():
    v = UsernameValidator()
    v("ValidUser123")  # 예외 없으면 통과


@pytest.mark.parametrize(
    "username, msg",
    [
        ("", "아이디를 입력해주세요."),
        ("ab", "4자 이상 150자 이하여야"),
        ("a" * 151, "4자 이상 150자 이하여야"),
        ("user!name", "영문과 숫자만 사용 가능합니다."),
    ],
)
def test_username_simple_rule_violations(username, msg):
    UserFactory(username="ExistingUser")
    v = UsernameValidator()
    with pytest.raises(SNUBaseballException) as e:
        v(username)
    assert msg in str(e.value)


@pytest.fixture
def existing_user():
    return UserFactory(username="ExistingUser")


def test_username_must_be_unique(existing_user):
    v = UsernameValidator()
    with pytest.raises(SNUBaseballException) as e:
        v("existinguser")  # 대소문자 구분 없이 중복 검사
    assert "이미 사용 중인 아이디입니다." in str(e.value)
