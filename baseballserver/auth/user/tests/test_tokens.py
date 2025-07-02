from typing import cast
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from core.tests import BaseAPITestCase
from ..models import User


class TokenRefreshAPITestCase(BaseAPITestCase):
    def setUp(self):
        self.url = "/api/tokens/refresh/"
        self.user = User.objects.get(username="admin")
        instance = RefreshToken.for_user(self.user)
        self.refresh_token = str(cast(RefreshToken, instance))

    def test_token_refresh(self):
        ## 1. normal
        response = self.client.post(self.url, {"refresh": self.refresh_token})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_token_refresh_fail(self):
        ## 1. normal
        response = self.client.post(self.url, {"refresh": "12341234"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
