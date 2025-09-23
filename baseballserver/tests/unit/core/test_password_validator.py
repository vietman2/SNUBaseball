import pytest

from core.auth import PasswordValidator
from core.error_handling import SNUBaseballException
from tests.factories import UserFactory

pytestmark = pytest.mark.django_db


def test_password_valid_when_all_rules_met():
    user = UserFactory(username="hong", password="PrevPass1!")
    v = PasswordValidator()
    # 대/소문자, 숫자, 특수문자 포함 & 아이디 미포함 & 이전 비번과 다름
    v.validate("NewStrong1!", user=user)  # 예외 없으면 통과


@pytest.mark.parametrize(
    "pwd, msg",
    [
        ("", "비밀번호를 입력해주세요."),
        ("Aa1!aa", "8자 이상 128자 이하여야"),
        ("A" * 129 + "a1!", "8자 이상 128자 이하여야"),
        ("lowerpass1!", "대문자"),
        ("UPPERPASS1!", "소문자"),
        ("NoDigits!", "숫자"),
        ("NoSpecial11", "특수문자"),
    ],
)
def test_password_simple_rule_violations(pwd, msg):
    v = PasswordValidator()
    with pytest.raises(SNUBaseballException) as e:
        v.validate(pwd, user=None)
    assert msg in str(e.value)


def test_password_must_not_contain_username():
    user = UserFactory(username="Captain")
    v = PasswordValidator()
    with pytest.raises(SNUBaseballException) as e:
        v.validate("Aa1!captainXX", user=user)  # 대소문자 무시 포함 검사
    assert "아이디" in str(e.value)


def test_password_must_not_equal_previous():
    user = UserFactory(username="kim", password="SameOld1!")
    v = PasswordValidator()
    with pytest.raises(SNUBaseballException) as e:
        v.validate("SameOld1!", user=user)  # 이전 비밀번호와 동일
    assert "이전 비밀번호" in str(e.value)
