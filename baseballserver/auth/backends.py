from django.contrib.auth.backends import ModelBackend

from auth.user.models import User


class AuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get(User.USERNAME_FIELD)
        if username is None or password is None:
            return

        try:
            user = User._default_manager.get(
                **{f"{User.USERNAME_FIELD}__iexact": username}
            )
        except User.DoesNotExist:
            User().set_password(password)  # timing attack 방지 관용구
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
