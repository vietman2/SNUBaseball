from io import BytesIO
from unittest.mock import patch
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase
from rest_framework import status

def generate_photo_file():
    file = BytesIO()
    image = Image.new("RGBA", size=(100, 100), color=(155, 0, 0))
    image.save(file, "png")
    file.name = "test.png"
    file.seek(0)
    return file

class MajorViewSetTest(APITestCase):
    fixtures = ["core/data/initial/majors.json"]

    def test_unallowed_methods(self):
        response = self.client.get('/api/majors/1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_list(self):
        response = self.client.get('/api/majors/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class PersonViewSetTest(APITestCase):
    fixtures = ["core/data/initial/majors.json", "core/data/initial/obs.json", "core/data/initial/ybs.json"]

    def setUp(self):
        self.image = generate_photo_file()
        self.data = {
            'first_name': '테스트',
            'last_name': '유저',
            'admission_year': 2021,
            'student_id': '2021-00000',
            'role': "선수",
            'profile_image': SimpleUploadedFile(self.image.name, self.image.getvalue())
        }

    def test_unallowed_methods(self):
        response = self.client.get('/api/members/1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_list(self):
        response = self.client.get('/api/members/', {'filter': "YB"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get('/api/members/', {'filter': "OB"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get('/api/members/', {'filter': "지도자"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get('/api/members/', {'filter': "기타"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('django.core.files.storage.default_storage.save')
    def test_create(self, mock_save):
        mock_save.return_value = 'profile_image.jpg'
        response = self.client.post('/api/members/', self.data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @patch('django.core.files.storage.default_storage.save')
    def test_create_with_phone(self, mock_save):
        mock_save.return_value = 'profile_image.jpg'
        self.data['phone'] = "010-1234-5678"
        response = self.client.post('/api/members/', self.data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_fail(self):
        ## 1. empty data
        response = self.client.post('/api/members/', {}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 2. role validation
        self.data['role'] = "역할"
        response = self.client.post('/api/members/', self.data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 3. student_id validation
        self.data['role'] = "매니저"
        self.data['student_id'] = "20210000"
        response = self.client.post('/api/members/', self.data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.data['student_id'] = ""
        response = self.client.post('/api/members/', self.data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        ## 4. phone validation
        self.data['student_id'] = "2021-00000"
        self.data['phone'] = "1234-5678"
        response = self.client.post('/api/members/', self.data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
