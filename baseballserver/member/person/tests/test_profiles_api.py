from unittest.mock import patch

from auth.user.models import User
from core.test import SNUBaseballTestCase


class UpdateProfileAPITestCase(SNUBaseballTestCase):
    def setUp(self):
        self.admin = User.objects.get(username="admin")
        self.presign_data = {
            "filename": "profile.png",
            "content_type": "image/png",
            "size": 1024,
        }

    def test_unauthorized(self):
        res_presign = self.client.post("/api/v1/profiles/1/avatar/presign/")
        self.assertEqual(res_presign.status_code, 403)

        res_complete = self.client.put("/api/v1/profiles/1/avatar/complete/")
        self.assertEqual(res_complete.status_code, 403)

    def test_avatar_presign_missing_params(self):
        self.client.force_login(user=self.admin)

        res = self.client.post("/api/v1/profiles/1/avatar/presign/")
        self.assertEqual(res.status_code, 400)
        self.assertIn("파일 이름과 콘텐츠 타입이 필요합니다.", res.data["message"])

    @patch("member.person.views.profiles.get_presigned_post")
    def test_avatar_presign_exception(self, mock_get_presigned_post):
        mock_get_presigned_post.side_effect = Exception("S3 error")
        self.client.force_login(user=self.admin)

        res = self.client.post("/api/v1/profiles/1/avatar/presign/", data=self.presign_data)
        self.assertEqual(res.status_code, 400)
        self.assertIn("Presign URL 생성에 실패했습니다.", res.data["message"])

    @patch("member.person.views.profiles.get_presigned_post")
    def test_avatar_presign_none(self, mock_get_presigned_post):
        mock_get_presigned_post.return_value = None
        self.client.force_login(user=self.admin)

        res = self.client.post("/api/v1/profiles/1/avatar/presign/", data=self.presign_data)
        self.assertEqual(res.status_code, 400)
        self.assertIn("Presign URL 생성에 실패했습니다.", res.data["message"])

    @patch("member.person.views.profiles.get_presigned_post")
    def test_avatar_presign_success(self, mock_get_presigned_post):
        mock_get_presigned_post.return_value = {
            "url": "https://example-bucket.s3.amazonaws.com/",
            "fields": {
                "key": "profiles/1/20231010-profile.png",
                "AWSAccessKeyId": "EXAMPLEACCESSKEY",
                "policy": "EXAMPLEPOLICY",
                "signature": "EXAMPLESIGNATURE",
                "Content-Type": "image/png",
            },
        }
        self.client.force_login(user=self.admin)

        data = {
            "filename": "profile.png",
            "content_type": "image/png",
            "size": 1024,
        }
        res = self.client.post("/api/v1/profiles/1/avatar/presign/", data=data)
        self.assertEqual(res.status_code, 200)
        self.assertIn("url", res.data)
        self.assertIn("fields", res.data)

    def test_avatar_complete_missing_key(self):
        self.client.force_login(user=self.admin)

        res = self.client.put("/api/v1/profiles/1/avatar/complete/")
        self.assertEqual(res.status_code, 400)
        self.assertIn("키가 필요합니다.", res.data["message"])

    def test_avatar_complete_invalid_key(self):
        self.client.force_login(user=self.admin)

        data = {"key": "profiles/2/20231010-profile.png"}
        res = self.client.put("/api/v1/profiles/1/avatar/complete/", data=data)
        self.assertEqual(res.status_code, 400)
        self.assertIn("유효하지 않은 키입니다.", res.data["message"])

    def test_avatar_complete_success(self):
        self.client.force_login(user=self.admin)

        data = {"key": "profiles/1/20231010-profile.png"}
        res = self.client.put("/api/v1/profiles/1/avatar/complete/", data=data)
        self.assertEqual(res.status_code, 200)
        self.assertIn("url", res.data)

class ProfileAPITestCase(SNUBaseballTestCase):
    def setUp(self):
        self.admin = User.objects.get(username="admin")

    def test_unallowed_methods(self):
        self.client.force_login(user=self.admin)

        res_post = self.client.post("/api/v1/profiles/")
        self.assertEqual(res_post.status_code, 405)

        res_put = self.client.put("/api/v1/profiles/1/")
        self.assertEqual(res_put.status_code, 405)
