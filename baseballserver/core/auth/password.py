import re

from core.error_handling import SNUBaseballException


class PasswordValidator:
    """
    비밀번호 유효성 검사기
    - 비밀번호는 8자 이상 128자 이하여야 한다
    - 비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 한다
    - 유저의 아이디를 포함해서는 안 된다
    - 이전 비밀번호와 같아서는 안 된다
    """

    def validate(self, value, user=None):
        if not value:
            raise SNUBaseballException("비밀번호를 입력해주세요.")

        if not 8 <= len(value) <= 128:
            raise SNUBaseballException("비밀번호는 8자 이상 128자 이하여야 합니다.")

        if not re.search(r"[A-Z]", value):
            raise SNUBaseballException(
                "비밀번호는 최소 하나의 대문자를 포함해야 합니다."
            )
        if not re.search(r"[a-z]", value):
            raise SNUBaseballException(
                "비밀번호는 최소 하나의 소문자를 포함해야 합니다."
            )
        if not re.search(r"\d", value):
            raise SNUBaseballException("비밀번호는 최소 하나의 숫자를 포함해야 합니다.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise SNUBaseballException(
                "비밀번호는 최소 하나의 특수문자를 포함해야 합니다."
            )

        if user and user.username.lower() in value.lower():
            raise SNUBaseballException("비밀번호에 아이디를 포함할 수 없습니다.")

        if user and user.check_password(value):
            raise SNUBaseballException(
                "이전 비밀번호와 동일한 비밀번호는 사용할 수 없습니다."
            )
