from core.test import SNUBaseballTestCase


class MembersAPITestCase(SNUBaseballTestCase):
    def test_get_members_list(self):
        res = self.client.get("/api/v1/members/")
        self.assertEqual(res.status_code, 200)

    def test_member_details(self):
        res = self.client.get("/api/v1/members/1/")
        self.assertEqual(res.status_code, 200)

    def test_member_basic_info_update(self):
        self.client.force_authenticate(user=self.user)

        res = self.client.patch(
            f"/api/v1/members/{self.user.member.id}/",
            {
                "back_number": 10,
                "birth_date": "1999-01-01",
                "date_joined": "2020-03-01",
                "num_semester": 10,
            },
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["back_number"], 10)
        self.assertEqual(res.data["birth_date"], "1999-01-01")
        self.assertEqual(res.data["date_joined"], "2020-03-01")
        self.assertEqual(res.data["num_semester"], 10)

    def test_member_basic_info_update_unauthenticated(self):
        res = self.client.patch(
            "/api/v1/members/1/",
            {
                "back_number": 10,
                "birth_date": "1999-01-01",
                "date_joined": "2020-03-01",
                "num_semester": 10,
            },
        )
        self.assertEqual(res.status_code, 403)

    def test_member_basic_info_update_forbidden_field(self):
        self.client.force_authenticate(user=self.user)

        res = self.client.patch(
            f"/api/v1/members/{self.user.member.id}/",
            {
                "name": "New Name",
            },
        )
        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.data["code"], "cannot_modify_field")
        self.assertIn("name 필드는 수정할 수 없습니다.", res.data["message"])

    def test_member_basic_info_update_invalid_data(self):
        self.client.force_authenticate(user=self.user)

        res = self.client.patch(
            f"/api/v1/members/{self.user.member.id}/",
            {
                "birth_date": "invalid-date",
            },
        )
        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.data["code"], "invalid_data")
        self.assertIn("유효하지 않은 데이터입니다.", res.data["message"])
