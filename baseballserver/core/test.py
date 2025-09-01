from rest_framework.test import APITestCase

from auth.user.models import User
from member.person.models import Member


class SNUBaseballTestCase(APITestCase):
    fixtures = [
        "data/initial/majors.json",
        "data/initial/member_meta.json",
        "data/test/auth.json",
    ]

    def setUp(self):
        member = Member.objects.get(name="홍길동")
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword",
            member=member,
        )
