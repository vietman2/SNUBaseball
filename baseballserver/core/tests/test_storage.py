from unittest.mock import patch
from django.test import TestCase

from ..storage import get_s3_client

class StorageTestCase(TestCase):
    @patch("boto3.client")
    def test_get_s3_client(self, mock_boto_client):
        mock_boto_client.return_value = "mocked_s3_client"
        s3_client = get_s3_client()
        self.assertEqual(s3_client, "mocked_s3_client")
        mock_boto_client.assert_called_once()
