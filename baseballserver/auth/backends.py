from django.contrib.auth.backends import ModelBackend
from django.core.exceptions import ObjectDoesNotExist

from auth.user.models import User


class AuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get(User.USERNAME_FIELD)
        if username is None or password is None:
            return None

        try:
            user = User._default_manager.get(  ## pylint: disable=protected-access
                **{f"{User.USERNAME_FIELD}__iexact": username}
            )
        except ObjectDoesNotExist:
            User().set_password(password)  # timing attack 방지 관용구
            return None

        if user.check_password(password) and self.user_can_authenticate(user):
            return user

        return None
