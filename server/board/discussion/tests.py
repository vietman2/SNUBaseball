from unittest.mock import patch
from rest_framework.test import APITestCase
from rest_framework import status

from core.tests import generate_test_image_file
from person.user.models import User
from .models import DiscussionComment, Discussion, DiscussionAttachment

class DiscussionAPITestCase(APITestCase):
    fixtures = [
        "core/data/test/discussions.json", "core/data/initial/majors.json",
        "core/data/test/people.json"
    ]

    def setUp(self):
        self.url = '/v1/discussions/'
        self.user = User.objects.get(username='testuser_1')
        self.data = {
            'title': 'Test Discussion',
            'content': 'Test Content',
        }
        self.attachment = generate_test_image_file()

    def test_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.put(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_discussion_list(self):
        ## 1. without query
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. with query
        response = self.client.get(f'{self.url}?query=Test')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_discussion_retrieve(self):
        ## 1. without attachments
        self.client.force_authenticate(user=self.user)
        response = self.client.get(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. with attachments
        response = self.client.get(f'{self.url}2/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('django.core.files.storage.default_storage.save')
    def test_discussion_create(self, mock_save):
        ## 1. without attachments
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        ## 2. with attachments
        mock_save.return_value = 'test1.png'
        data = self.data.copy()
        data['attachments'] = [self.attachment]
        response = self.client.post(self.url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)       

    def test_discussion_create_invalid(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('django.core.files.storage.default_storage.save')
    def test_discussion_update(self, mock_save):
        ## 1. without attachments
        self.client.force_authenticate(user=self.user)
        response = self.client.put(f'{self.url}1/', self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. with attachments
        mock_save.return_value = 'test1.png'
        data = self.data.copy()
        data['attachments'] = [self.attachment]
        response = self.client.put(f'{self.url}1/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_discussion_update_invalid(self):
        ## no data
        self.client.force_authenticate(user=self.user)
        response = self.client.put(f'{self.url}1/', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## no auth
        user = User.objects.get(username='testuser_3')
        self.client.force_authenticate(user=user)
        response = self.client.put(f'{self.url}1/', self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_discussion_delete(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_discussion_delete_fail(self):
        ## no auth
        user = User.objects.get(username='testuser_3')
        self.client.force_authenticate(user=user)
        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        ## no discussion
        self.client.force_authenticate(user=self.user)
        response = self.client.delete(f'{self.url}100/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_discussion_like(self):
        ## 1. like
        self.client.force_authenticate(user=self.user)
        response = self.client.post(f'{self.url}1/like/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        ## 2. unlike
        response = self.client.post(f'{self.url}1/like/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class DiscussionCommentAPITestCase(APITestCase):
    fixtures = [
        "core/data/test/discussions.json", "core/data/initial/majors.json",
        "core/data/test/people.json"
    ]

    def setUp(self):
        self.url = '/v1/discussions/2/comments/'
        self.user = User.objects.get(username='testuser_1')
        self.data = {
            'content': 'Test Comment',
        }

    def test_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.put(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.delete(f'{self.url}1/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_discussion_comment_create(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_discussion_comment_create_invalid(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_discussion_comment_update(self):
        self.client.force_authenticate(user=self.user)
        comment = DiscussionComment.objects.first()
        response = self.client.put(f'{self.url}{comment.id}/', self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_discussion_comment_update_invalid(self):
        self.client.force_authenticate(user=self.user)
        comment = DiscussionComment.objects.first()
        response = self.client.put(f'{self.url}{comment.id}/', {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_discussion_comment_delete(self):
        self.client.force_authenticate(user=self.user)
        comment = DiscussionComment.objects.first()
        response = self.client.delete(f'{self.url}{comment.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class ModelsTestCase(APITestCase):
    fixtures = [
        "core/data/test/discussions.json", "core/data/initial/majors.json",
        "core/data/test/people.json"
    ]

    def test_discussion_str(self):
        discussion = Discussion.objects.first()
        self.assertEqual(str(discussion), discussion.title)

    def test_discussion_attachment_str(self):
        attachment = DiscussionAttachment.objects.first()
        name = attachment.file.name.split('/')[-1]
        self.assertEqual(str(attachment), name)
