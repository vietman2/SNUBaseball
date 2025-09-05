from django.test import TestCase    

from ..models import SNUBaseballImage

class SNUBaseballImageModelTest(TestCase):
    def test_str_method(self):
        image = SNUBaseballImage(key="test/key/image.jpg")
        self.assertEqual(str(image), "test/key/image.jpg")
