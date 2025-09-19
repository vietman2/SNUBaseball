import re
from django.contrib.auth import get_user_model

from core.error_handling import SNUBaseballException

User = get_user_model()


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
            raise SNUBaseballException("아이디를 입력해주세요.")

        ## 제 1 조건: 아이디는 대소문자를 구분하지 않는다
        ## 제 2 조건: 아이디는 유일해야 한다
        if User.objects.filter(username__iexact=value).exists():
            raise SNUBaseballException("이미 사용 중인 아이디입니다.")

        ## 제 3 조건: 아이디는 특수문자를 포함할 수 없다
        ## 제 4 조건: 아이디는 영문과 숫자만 사용할 수 있다
        if not value.isalnum() or not re.match("^[a-zA-Z0-9]*$", value):
            raise SNUBaseballException("아이디는 영문과 숫자만 사용 가능합니다.")

        ## 제 5 조건: 아이디는 4자 이상 150자 이하여야 한다
        if not 4 <= len(value) <= 150:
            raise SNUBaseballException("아이디는 4자 이상 150자 이하여야 합니다.")
