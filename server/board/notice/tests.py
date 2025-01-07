from unittest.mock import patch
from rest_framework.test import APITestCase
from rest_framework import status

from core.tests import generate_test_image_file
from person.user.models import User
from .models import Notice, NoticeComment, NoticeAttachment, NoticeCategory

class NoticeAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/chips.json", "core/data/initial/majors.json",
        "core/data/test/notices.json", "core/data/test/people.json",
    ]

    def setUp(self):
        self.url = '/v1/notices/'
        self.user = User.objects.get(username='testuser_1')
        self.data = {
            'title': 'Test Notice',
            'content': 'Test Content',
            'category_label': '일반',
        }
        self.attachment = generate_test_image_file()

    def test_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(f'{self.url}categories/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.put(f'{self.url}1/', self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_notice_list(self):
        self.client.force_authenticate(user=self.user)

        ## 1. without query
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. with query and category
        response = self.client.get(f'{self.url}?query=Test&category=일반')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_notice_retrieve(self):
        self.client.force_authenticate(user=self.user)
        ## no attachment
        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## with attachment
        response = self.client.get(f'{self.url}2/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_notice_category_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'{self.url}categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('django.core.files.storage.default_storage.save')
    def test_notice_create(self, mock_save):
        self.client.force_authenticate(user=self.user)
        ## no attachment
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        ## with attachment
        mock_save.return_value = 'test1.png'
        data = self.data.copy()
        data['attachments'] = [self.attachment]
        response = self.client.post(self.url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_notice_create_invalid_category(self):
        self.client.force_authenticate(user=self.user)
        data = self.data.copy()
        data['category_label'] = 'Invalid'
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('django.core.files.storage.default_storage.save')
    def test_notice_update(self, mock_save):
        self.client.force_authenticate(user=self.user)
        ## no attachment
        notice = Notice.objects.first()
        response = self.client.put(f'{self.url}{notice.id}/', self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## with attachment
        mock_save.return_value = 'test1.png'
        data = self.data.copy()
        data['attachments'] = [self.attachment]
        response = self.client.put(f'{self.url}{notice.id}/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_notice_update_invalid_category(self):
        self.client.force_authenticate(user=self.user)
        notice = Notice.objects.first()
        data = self.data.copy()
        data['category_label'] = 'Invalid'
        response = self.client.put(f'{self.url}{notice.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_notice_delete(self):
        self.client.force_authenticate(user=self.user)
        notice = Notice.objects.first()
        response = self.client.delete(f'{self.url}{notice.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_notice_like(self):
        self.client.force_authenticate(user=self.user)
        notice = Notice.objects.first()

        ## 1. like
        response = self.client.post(f'{self.url}{notice.id}/like/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. unlike
        response = self.client.post(f'{self.url}{notice.id}/like/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class NoticeCommentAPITestCase(APITestCase):
    fixtures = [
        "core/data/initial/chips.json", "core/data/initial/majors.json",
        "core/data/test/notices.json", "core/data/test/people.json",
    ]

    def setUp(self):
        self.url = '/v1/notices/1/comments/'
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
        comment = NoticeComment.objects.first()
        response = self.client.put(f'{self.url}{comment.id}/', self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_comment_update_invalid(self):
        self.client.force_authenticate(user=self.user)
        comment = NoticeComment.objects.first()
        data = self.data.copy()
        data.pop('content')
        response = self.client.put(f'{self.url}{comment.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_comment_delete(self):
        self.client.force_authenticate(user=self.user)
        comment = NoticeComment.objects.first()
        response = self.client.delete(f'{self.url}{comment.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class ModelsTestCase(APITestCase):
    fixtures = [
        "core/data/initial/chips.json", "core/data/initial/majors.json",
        "core/data/test/notices.json", "core/data/test/people.json",
    ]

    def test_notice_model(self):
        notice = Notice.objects.first()
        self.assertEqual(str(notice), notice.title)

    def test_notice_attachment_model(self):
        attachment = NoticeAttachment.objects.first()
        self.assertEqual(str(attachment), attachment.file.name.split('/')[-1])

    def test_notice_category_model(self):
        category = NoticeCategory.objects.first()
        self.assertEqual(str(category), category.label)
