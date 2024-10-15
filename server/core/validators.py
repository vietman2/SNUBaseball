import re
from rest_framework.exceptions import ValidationError

from person.user.models import User

class UsernameValidator:
    ## condition 1: usernames are case-insensitive
    ## condition 2: usernames are unique
    ## condition 3: usernames cannot contain special characters
    ## condition 4: usernames must be alphabets + numbers (cannot be in Korean)
    ## condition 5: minimum length of 4, maximum length of 150

    def __call__(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise ValidationError("이미 사용 중인 아이디입니다.")

        if not value.isalnum() or not re.match("^[a-zA-Z0-9]*$", value):
            raise ValidationError("아이디는 영문과 숫자만 사용 가능합니다.")

        if not 4 <= len(value) <= 150:
            raise ValidationError("아이디는 4자 이상 150자 이하여야 합니다.")

class MyPasswordValidator:
    def validate(self, password, user=None):        ## pylint: disable=unused-argument
        """비밀번호 유효성 검사"""

        if len(password) < 8:
            raise ValidationError("비밀번호는 8자리 이상이어야 합니다.")
        if not re.search(r"[a-zA-Z]", password):
            raise ValidationError("비밀번호는 하나 이상의 영문이 포함되어야 합니다.")
        if not re.search(r"\d", password):
            raise ValidationError("비밀번호는 하나 이상의 숫자가 포함되어야 합니다.")
        if not re.search(r"[!@#$%^&*()]", password):
            raise ValidationError(
                "비밀번호는 적어도 하나 이상의 특수문자가 포함되어야 합니다."
            )
