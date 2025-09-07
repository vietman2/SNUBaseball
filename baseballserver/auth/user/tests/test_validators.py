from core.test import SNUBaseballTestCase
from ..validators import UsernameValidator, PasswordValidator


class UsernameValidatorTest(SNUBaseballTestCase):
    def setUp(self):
        super().setUp()
        self.validator = UsernameValidator()

    def test_valid_username(self):
        self.validator("ValidUser123")

    def test_empty_username(self):
        with self.assertRaisesMessage(Exception, "아이디를 입력해주세요."):
            self.validator("")

    def test_duplicate_username(self):
        with self.assertRaisesMessage(Exception, "이미 사용 중인 아이디입니다."):
            self.validator("testuser")

    def test_special_characters_in_username(self):
        with self.assertRaisesMessage(
            Exception, "아이디는 영문과 숫자만 사용 가능합니다."
        ):
            self.validator("User@123")

    def test_short_username(self):
        with self.assertRaisesMessage(
            Exception, "아이디는 4자 이상 150자 이하여야 합니다."
        ):
            self.validator("usr")

    def test_long_username(self):
        with self.assertRaisesMessage(
            Exception, "아이디는 4자 이상 150자 이하여야 합니다."
        ):
            self.validator("u" * 151)


class PasswordValidatorTest(SNUBaseballTestCase):
    def setUp(self):
        super().setUp()
        self.validator = PasswordValidator()

    def test_valid_password(self):
        self.validator.validate("StrongPass1!", user=self.user)

    def test_password_missing_uppercase(self):
        with self.assertRaisesMessage(
            Exception, "비밀번호는 최소 하나의 대문자를 포함해야 합니다."
        ):
            self.validator.validate("weakpass1!", self.user)

    def test_password_missing_lowercase(self):
        with self.assertRaisesMessage(
            Exception, "비밀번호는 최소 하나의 소문자를 포함해야 합니다."
        ):
            self.validator.validate("WEAKPASS1!", self.user)

    def test_password_missing_number(self):
        with self.assertRaisesMessage(
            Exception, "비밀번호는 최소 하나의 숫자를 포함해야 합니다."
        ):
            self.validator.validate("WeakPassword!", self.user)

    def test_password_missing_special_character(self):
        with self.assertRaisesMessage(
            Exception, "비밀번호는 최소 하나의 특수문자를 포함해야 합니다."
        ):
            self.validator.validate("WeakPassword1", self.user)

    def test_empty_password(self):
        with self.assertRaisesMessage(Exception, "비밀번호를 입력해주세요."):
            self.validator.validate("", self.user)

    def test_password_length(self):
        with self.assertRaisesMessage(
            Exception, "비밀번호는 8자 이상 128자 이하여야 합니다."
        ):
            self.validator.validate("Short1!", self.user)

        with self.assertRaisesMessage(
            Exception, "비밀번호는 8자 이상 128자 이하여야 합니다."
        ):
            self.validator.validate("LongPassword" * 12, self.user)

    def test_password_contains_username(self):
        with self.assertRaisesMessage(
            Exception, "비밀번호에 아이디를 포함할 수 없습니다."
        ):
            self.validator.validate("Testuser1!", self.user)

    def test_password_same_as_old(self):
        with self.assertRaisesMessage(
            Exception, "이전 비밀번호와 동일한 비밀번호는 사용할 수 없습니다."
        ):
            self.validator.validate("Testpassword123@", self.user)
