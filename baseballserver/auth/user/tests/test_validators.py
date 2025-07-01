from django.test import TestCase
from rest_framework.exceptions import ValidationError
from unittest.mock import patch

from auth.user.models import User
from ..validators import PasswordValidator, UsernameValidator


class PasswordValidatorTestCase(TestCase):
    fixtures = [
        "data/initial/majors.json",
        "data/initial/member_roles.json",
        "data/initial/member_status.json",
        "data/test/auth.json",
    ]

    def setUp(self):
        self.validator = PasswordValidator()
        self.admin = User.objects.get(username="admin")

    def test_validate_password_success(self):
        password = "Valid@1234"
        self.validator.validate(password)

    def test_validate_password_empty(self):
        with self.assertRaises(ValidationError) as context:
            self.validator.validate("")
        self.assertIn("비밀번호를 입력해주세요.", str(context.exception))

    def test_validate_password_too_short(self):
        with self.assertRaises(ValidationError) as context:
            self.validator.validate("short")
        self.assertIn(
            "비밀번호는 8자 이상 128자 이하여야 합니다.", str(context.exception)
        )

    def test_validate_password_no_uppercase(self):
        with self.assertRaises(ValidationError) as context:
            self.validator.validate("lowercase@1234")
        self.assertIn(
            "비밀번호는 최소 하나의 대문자를 포함해야 합니다.", str(context.exception)
        )

    def test_validate_password_no_lowercase(self):
        with self.assertRaises(ValidationError) as context:
            self.validator.validate("UPPERCASE@1234")
        self.assertIn(
            "비밀번호는 최소 하나의 소문자를 포함해야 합니다.", str(context.exception)
        )

    def test_validate_password_no_digit(self):
        with self.assertRaises(ValidationError) as context:
            self.validator.validate("NoDigit@Upper")
        self.assertIn(
            "비밀번호는 최소 하나의 숫자를 포함해야 합니다.", str(context.exception)
        )

    def test_validate_password_no_special_char(self):
        with self.assertRaises(ValidationError) as context:
            self.validator.validate("NoSpecial1234")
        self.assertIn(
            "비밀번호는 최소 하나의 특수문자를 포함해야 합니다.", str(context.exception)
        )

    def test_validate_password_contains_username(self):
        with self.assertRaises(ValidationError) as context:
            self.validator.validate("Admin@1234", user=self.admin)
        self.assertIn("비밀번호에 아이디를 포함할 수 없습니다.", str(context.exception))

    @patch("auth.user.models.User.check_password")
    def test_validate_password_same_as_previous(self, mock_check_password):
        mock_check_password.return_value = True

        with self.assertRaises(ValidationError) as context:
            self.validator.validate("Valid@1234", user=self.admin)
        self.assertIn("이전 비밀번호와 같을 수 없습니다.", str(context.exception))


class UsernameValidatorTestCase(TestCase):
    fixtures = [
        "data/initial/majors.json",
        "data/initial/member_roles.json",
        "data/initial/member_status.json",
        "data/test/auth.json",
    ]

    def setUp(self):
        self.validator = UsernameValidator()

    def test_validate_username_success(self):
        username = "validuser123"
        self.validator(username)

    def test_validate_username_empty(self):
        with self.assertRaises(ValidationError) as context:
            self.validator("")
        self.assertIn("아이디를 입력해주세요.", str(context.exception))

    def test_validate_username_already_exists(self):
        with self.assertRaises(ValidationError) as context:
            self.validator("admin")
        self.assertIn("이미 사용 중인 아이디입니다.", str(context.exception))

    def test_validate_username_special_characters(self):
        with self.assertRaises(ValidationError) as context:
            self.validator("invalid@user")
        self.assertIn("아이디는 영문과 숫자만 사용 가능합니다.", str(context.exception))

    def test_validate_username_length(self):
        with self.assertRaises(ValidationError) as context:
            self.validator("abc")
        self.assertIn(
            "아이디는 4자 이상 150자 이하여야 합니다.", str(context.exception)
        )
