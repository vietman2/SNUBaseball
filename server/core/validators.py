import re
from rest_framework.exceptions import ValidationError

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

    def get_help_text(self): # 2)
        return "비밀번호는 8자리 이상이며 영문, 숫자, 특수문자를 포함해야 합니다."
