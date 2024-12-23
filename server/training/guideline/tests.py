from rest_framework.test import APITestCase
from rest_framework import status

from person.user.models import User
from .models import GuidelineComment

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
            "video_id": "https://www.youtube.com/watch?v=123456",
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

    def test_guideline_list(self):
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

    def test_guideline_retrieve(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(f'{self.url}2/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_guideline_create(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        ## youtu.be
        self.data['video_id'] = "https://youtu.be/123456"
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.data['video_id'] = "https://youtu.be/123456?list=PL123456"
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_guideline_create_invalid(self):
        self.client.force_authenticate(user=self.user)
        ## 1. invalid category
        self.data['category'] = "invalid"
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 2. invalid video_id
        self.data['category'] = "내야"
        self.data['video_id'] = "invalid"
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 3. min > max
        self.data['video_id'] = "https://www.youtube.com/watch?v=123456"
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
