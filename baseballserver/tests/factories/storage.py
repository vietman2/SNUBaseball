import mimetypes
from factory import Sequence
from factory.django import DjangoModelFactory

from apps.media.storage.models import StoredFile


def _mime_from_ext(ext: str) -> str:
    mime, _ = mimetypes.guess_type(f"dummy.{ext}")
    return mime or "application/octet-stream"


class StoredFileFactory(DjangoModelFactory):
    """
    StoredFile 기본 팩토리
    - key: "tests/uploads/file_<n>.<ext>"
    - original_filename: 기본은 빈 문자열(옵션 필드), with_original 파라미터/트레잇으로 채울 수 있음
    - mime: ext 기반 추론
    - size: 기본 1234 (테스트에서 언제든지 override 가능)
    """

    class Meta:
        model = StoredFile
        django_get_or_create = ("key",)

    key = Sequence(lambda n: f"tests/uploads/file_{n}.bin")  # 유니크 보장
    original_filename = ""
    mime = "application/octet-stream"
    size = 1234
