import pytest
from django.conf import settings

from tests.factories import StoredFileFactory


pytestmark = pytest.mark.django_db


def test_stored_file_methods():
    file = StoredFileFactory(key="path/to/file.png")
    assert str(file) == "path/to/file.png"
    assert file.url == f"{settings.MEDIA_CDN_BASE_URL}/{file.key}"
