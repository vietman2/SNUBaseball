import re
from rest_framework.exceptions import ValidationError

from .models import User


class UsernameValidator:
    """
    아이디 유효성 검사기
    - 아이디는 대소문자를 구분하지 않는다
    - 아이디는 유일해야 한다
    - 아이디는 특수문자를 포함할 수 없다
    - 아이디는 영문과 숫자만 사용할 수 있다
    - 아이디는 4자 이상 150자 이하여야 한다
    """

    def __call__(self, value):
        if not value:
            raise ValidationError("아이디를 입력해주세요.")

        ## 제 1 조건: 아이디는 대소문자를 구분하지 않는다
        ## 제 2 조건: 아이디는 유일해야 한다
        if User.objects.filter(username__iexact=value).exists():
            raise ValidationError("이미 사용 중인 아이디입니다.")

        ## 제 3 조건: 아이디는 특수문자를 포함할 수 없다
        ## 제 4 조건: 아이디는 영문과 숫자만 사용할 수 있다
        if not value.isalnum() or not re.match("^[a-zA-Z0-9]*$", value):
            raise ValidationError("아이디는 영문과 숫자만 사용 가능합니다.")

        ## 제 5 조건: 아이디는 4자 이상 150자 이하여야 한다
        if not 4 <= len(value) <= 150:
            raise ValidationError("아이디는 4자 이상 150자 이하여야 합니다.")


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
            raise ValidationError("비밀번호를 입력해주세요.")

        if not (8 <= len(value) <= 128):
            raise ValidationError("비밀번호는 8자 이상 128자 이하여야 합니다.")

        if not re.search(r"[A-Z]", value):
            raise ValidationError("비밀번호는 최소 하나의 대문자를 포함해야 합니다.")
        if not re.search(r"[a-z]", value):
            raise ValidationError("비밀번호는 최소 하나의 소문자를 포함해야 합니다.")
        if not re.search(r"\d", value):
            raise ValidationError("비밀번호는 최소 하나의 숫자를 포함해야 합니다.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise ValidationError("비밀번호는 최소 하나의 특수문자를 포함해야 합니다.")

        if user and user.username.lower() in value.lower():
            raise ValidationError("비밀번호에 아이디를 포함할 수 없습니다.")

        if user and user.check_password(value):
            raise ValidationError("이전 비밀번호와 같을 수 없습니다.")
