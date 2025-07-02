from django.contrib.auth.backends import ModelBackend
from django.utils import timezone


class AuthBackend(ModelBackend):
    """
    last login을 기록하고, 차단되거나, 활성화되지 않은 유저를 제외하는 커스텀 인증 백엔드.
    """

    def user_can_authenticate(self, user):
        can_auth = super().user_can_authenticate(user)

        return can_auth and not getattr(user, "is_blocked", False)

    def authenticate(self, request, username=None, password=None, **kwargs):
        user = super().authenticate(
            request, username=username, password=password, **kwargs
        )
        if user is not None:
            user.last_login = timezone.now()
            user.save(update_fields=["last_login"])
        return user
