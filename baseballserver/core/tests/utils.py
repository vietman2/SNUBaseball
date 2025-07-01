from rest_framework.test import APITestCase

from auth.user.models import User


class BaseAPITestCase(APITestCase):
    fixtures = [
        "data/initial/majors.json",
        "data/initial/member_roles.json",
        "data/initial/member_status.json",
        "data/test/auth.json",
    ]

    def setUp(self):
        self.admin = User.objects.get(username="admin")
