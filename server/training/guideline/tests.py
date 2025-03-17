from unittest.mock import patch
from django.test import TestCase
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.test import APITestCase

from person.user.models import User
from .models import GuidelineComment
from .utils import parse_media_url

class GuidelineAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/chips.json", "core/data/initial/majors.json",
        "core/data/test/people.json", "core/data/initial/categories.json",
        "core/data/test/guidelines.json"
    ]

    def setUp(self):
        self.url = '/v1/guidelines/'
        self.user = User.objects.get(username='testuser_1')
        self.data = {
            "title": "가이드라인 제목",
            "content": "가이드라인 내용",
            "url": "https://www.youtube.com/watch?v=123456",
            "category": "내야",
            "is_drill": False,
            "is_indoor": False,
            "min_people": 1,
            "max_people": 3,
        }

    def test_unauthorized(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.put(f'{self.url}1/', self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unallowed_methods(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.patch(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    @patch('training.guideline.serializers.get_presigned_url')
    def test_guideline_list(self, mock_get_presigned_url):
        mock_get_presigned_url.return_value = 'https://test.com/test1.png'
        self.client.force_authenticate(user=self.user)

        response = self.client.get(self.url, {'category': "내야", 'filter': "전체"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(self.url, {'category': "내야", 'filter': "드릴"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(self.url, {'category': "내야", 'filter': "예시"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_guideline_list_invalid(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.get(self.url, {'category': "내야", 'filter': "invalid"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('training.guideline.serializers.get_presigned_url')
    def test_guideline_retrieve(self, mock_get_presigned_url):
        mock_get_presigned_url.return_value = 'https://test.com/test1.png'
        self.client.force_authenticate(user=self.user)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(f'{self.url}2/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('training.guideline.serializers.parse_media_url')
    @patch('training.guideline.serializers.default_storage.save')
    def test_guideline_create(self, mock_save, mock_parse_media_url):
        mock_save.return_value = 'test1.png'
        mock_parse_media_url.return_value = {
            'video_id': '123456',
            'is_youtube': True,
            'thumbnail': 'test1.png'
        }
        self.client.force_authenticate(user=self.user)

        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        ## youtu.be
        self.data['video_id'] = "https://youtu.be/123456"
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @patch('training.guideline.serializers.parse_media_url')
    def test_guideline_create_invalid(self, mock_parse_media_url):
        mock_parse_media_url.return_value = {
            'video_id': '123456',
            'is_youtube': True,
            'thumbnail': 'test1.png'
        }
        self.client.force_authenticate(user=self.user)

        ## 1. invalid category
        self.data['category'] = "invalid"
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 2. min > max
        self.data['category'] = "내야"
        self.data['min_people'] = 3
        self.data['max_people'] = 1
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_guideline_update(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.put(f'{self.url}1/', self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_guideline_update_invalid(self):
        self.client.force_authenticate(user=self.user)
        data = self.data.copy()
        data['category'] = "invalid"
        response = self.client.put(f'{self.url}1/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_guideline_destroy(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_guideline_like(self):
        self.client.force_authenticate(user=self.user)
        ## like
        response = self.client.post(f'{self.url}1/like/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        ## unlike
        response = self.client.post(f'{self.url}1/like/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class GuidelineCommentAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/majors.json", "core/data/test/guidelines.json",
        "core/data/initial/categories.json", "core/data/test/people.json",
    ]

    def setUp(self):
        self.url = '/v1/guidelines/1/comments/'
        self.user = User.objects.get(username='testuser_1')
        self.data = {
            'content': 'Test Comment',
        }

    def test_unauthorized(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.put(f'{self.url}1/', self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_comment_create(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_comment_create_invalid(self):
        self.client.force_authenticate(user=self.user)
        data = self.data.copy()
        data.pop('content')
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_comment_update(self):
        self.client.force_authenticate(user=self.user)
        comment = GuidelineComment.objects.first()
        response = self.client.put(f'{self.url}{comment.id}/', self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_comment_update_invalid(self):
        self.client.force_authenticate(user=self.user)
        comment = GuidelineComment.objects.first()
        data = self.data.copy()
        data.pop('content')
        response = self.client.put(f'{self.url}{comment.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_comment_delete(self):
        self.client.force_authenticate(user=self.user)
        comment = GuidelineComment.objects.first()
        response = self.client.delete(f'{self.url}{comment.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class URLParseTestCase(TestCase):
    def test_parse_youtube_url(self):
        ## Case 1. YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
        url = "https://www.youtube.com/watch?v=123456"
        result = parse_media_url(url)
        self.assertTrue(result['is_youtube'])
        self.assertEqual(result['video_id'], '123456')

        ## Case 2. YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
        url = "https://www.youtube.com/shorts/12345678901"
        result = parse_media_url(url)
        self.assertTrue(result['is_youtube'])
        self.assertEqual(result['video_id'], '12345678901')

        ## Case 3. youtu.be shortened URL: https://youtu.be/VIDEO_ID
        url = "https://youtu.be/12345678901"
        result = parse_media_url(url)
        self.assertTrue(result['is_youtube'])
        self.assertEqual(result['video_id'], '12345678901')

    def test_parse_youtube_url_fail(self):
        ## Case 1. Invalid YouTube URL
        url = "https://www.youtube.com/watch"
        with self.assertRaises(ValidationError):
            parse_media_url(url)

        ## Case 2. Not 11 characters
        url = "https://www.youtube.com/shorts/123456"
        with self.assertRaises(ValidationError):
            parse_media_url(url)

        ## Case 3. Invalid youtu.be URL
        url = "https://youtu.be/123456"
        with self.assertRaises(ValidationError):
            parse_media_url(url)

    @patch('training.guideline.utils.requests.get')
    @patch('training.guideline.utils.instaloader.Post.from_shortcode')
    def test_parse_instagram_url(self, mock_instaloader, mock_requests):
        mock_requests.return_value.status_code = 200
        mock_requests.return_value.content = b"test"
        mock_instaloader.return_value.video_url = "https://www.instagram.com/p/123456"
        mock_instaloader.return_value.is_video = True
        mock_instaloader.return_value.url = "https://www.instagram.com/p/123456"

        ## Case 1. Instagram post URL: https://www.instagram.com/p/SHORTCODE
        url = "https://www.instagram.com/p/123456"
        result = parse_media_url(url)
        self.assertFalse(result['is_youtube'])

    @patch('training.guideline.utils.requests.get')
    @patch('training.guideline.utils.instaloader.Post.from_shortcode')
    def test_parse_instagram_url_fail(self, mock_instaloader, mock_requests):
        mock_requests.return_value.status_code = 404
        mock_instaloader.return_value.video_url = "https://www.instagram.com/p/123456"
        mock_instaloader.return_value.is_video = True
        mock_instaloader.return_value.url = "https://www.instagram.com/p/123456"

        ## Case 1. Invalid Instagram URL
        url = "https://www.instagram.com/invalid/123456"
        with self.assertRaises(ValidationError):
            parse_media_url(url)

        ## Case 2. Bad response
        url = "https://www.instagram.com/p/123456"
        with self.assertRaises(ValidationError):
            parse_media_url(url)
