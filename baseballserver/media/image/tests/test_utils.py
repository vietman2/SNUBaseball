from unittest.mock import patch
from django.test import TestCase

from ..utils import get_image_url, get_presigned_post

class ImageUtilsTestCase(TestCase):
    def test_get_image_url(self):
        key = "images/sample.jpg"
        expected_url = f"http://cdn.example.com/{key}"
        with self.settings(MEDIA_CDN_BASE_URL="http://cdn.example.com"):
            url = get_image_url(key)
            self.assertEqual(url, expected_url)

    @patch("core.storage.get_s3_client")
    def test_get_presigned_post_valid(self, mock_get_s3_client):
        mock_s3_client = mock_get_s3_client.return_value
        mock_s3_client.generate_presigned_post.return_value = {
            "url": "http://s3.amazonaws.com/test-bucket",
            "fields": {"key": "images/sample.jpg", "Content-Type": "image/jpeg"}
        }
        key = "images/sample.jpg"
        content_type = "image/jpeg"
        size = 1024 * 1024  # 1 MB
        with self.settings(
            MEDIA_KEY_PREFIX_WHITELIST=["images/"],
            AWS_S3_BUCKET_NAME="test-bucket"
        ):
            result = get_presigned_post(key, content_type, size)
            self.assertIsNotNone(result)
            self.assertIn("url", result)
            self.assertIn("fields", result)

    def test_get_presigned_post_invalid_prefix(self):
        key = "invalid/sample.jpg"
        content_type = "image/jpeg"
        size = 1024 * 1024  # 1 MB
        with self.settings(
            MEDIA_KEY_PREFIX_WHITELIST=["images/"],
            AWS_S3_BUCKET_NAME="test-bucket"
        ):
            result = get_presigned_post(key, content_type, size)
            self.assertIsNone(result)

    def test_get_presigned_post_invalid_size(self):
        key = "images/sample.jpg"
        content_type = "image/jpeg"
        size = 20 * 1024 * 1024  # 20 MB
        with self.settings(
            MEDIA_KEY_PREFIX_WHITELIST=["images/"],
            AWS_S3_BUCKET_NAME="test-bucket"
        ):
            result = get_presigned_post(key, content_type, size)
            self.assertIsNone(result)
