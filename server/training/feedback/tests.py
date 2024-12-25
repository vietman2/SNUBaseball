from rest_framework.test import APITestCase
from rest_framework import status

from person.user.models import User
from .models import Feedback, FeedbackComment

class FeedbackAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/chips.json", "core/data/initial/majors.json",
        "core/data/test/feedbacks.json", "core/data/test/people.json",
    ]

    def setUp(self):
        self.url = '/v1/feedbacks/'
        self.user = User.objects.get(username='testuser_1')
        self.data = {
            'title': '테스트 제목',
            'content': '테스트 내용',
            'category': '타격',
            'player': 1,
            'status': '진행중'
        }

    def test_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_feedback_list(self):
        ## 1. normal
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. with query, category, status and player filter
        response = self.client.get(f'{self.url}?query=Test&category=타격&player=1&status=신규')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 3. status filter
        response = self.client.get(f'{self.url}?query=Test&category=타격&player=1&status=완료')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_category_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'{self.url}categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_feedback_retrieve(self):
        self.client.force_authenticate(user=self.user)
        feedback = Feedback.objects.first()
        response = self.client.get(f'{self.url}{feedback.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_feedback_create(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_feedback_create_invalid(self):
        ## 1. without title
        self.client.force_authenticate(user=self.user)
        data = self.data.copy()
        data.pop('title')
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 2. invalid category
        self.client.force_authenticate(user=self.user)
        data = self.data.copy()
        data['category'] = 'Invalid'
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_feedback_delete(self):
        self.client.force_authenticate(user=self.user)
        feedback = Feedback.objects.first()
        response = self.client.delete(f'{self.url}{feedback.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_feedback_update(self):
        self.client.force_authenticate(user=self.user)
        feedback = Feedback.objects.first()
        data = self.data.copy()
        data['status'] = '검토중'
        response = self.client.patch(f'{self.url}{feedback.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_feedback_update_invalid(self):
        self.client.force_authenticate(user=self.user)
        feedback = Feedback.objects.first()
        data = self.data.copy()
        data.pop('title')
        response = self.client.patch(f'{self.url}{feedback.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class FeedbackCommentAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/chips.json", "core/data/initial/majors.json",
        "core/data/test/feedbacks.json", "core/data/test/people.json",
    ]

    def setUp(self):
        self.url = '/v1/feedbacks/1/comments/'
        self.user = User.objects.get(username='testuser_1')
        self.data = {
            'content': '테스트 댓글입니다.'
        }

    def test_unauthorized(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_feedback_comment_create(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_feedback_comment_create_invalid(self):
        self.client.force_authenticate(user=self.user)
        data = self.data.copy()
        data.pop('content')
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_feedback_comment_update(self):
        self.client.force_authenticate(user=self.user)
        comment = FeedbackComment.objects.first()
        response = self.client.put(f'{self.url}{comment.id}/', self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_feedback_comment_update_invalid(self):
        self.client.force_authenticate(user=self.user)
        comment = FeedbackComment.objects.first()
        data = self.data.copy()
        data.pop('content')
        response = self.client.put(f'{self.url}{comment.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_feedback_comment_delete(self):
        self.client.force_authenticate(user=self.user)
        comment = FeedbackComment.objects.first()
        response = self.client.delete(f'{self.url}{comment.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
