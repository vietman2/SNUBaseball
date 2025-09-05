import mimetypes
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from ..models import Member
from auth.permissions import IsAdminOrSelf
from core.exceptions import SNUBaseballException
from media.image.models import SNUBaseballImage
from media.image.utils import get_presigned_post, get_image_url


class ProfileViewSet(ModelViewSet):
    queryset = Member.objects.all()
    http_method_names = ["post", "put"]

    def get_permissions(self):
        if self.action in ["avatar_presign", "avatar_complete"]:
            permission_classes = [IsAdminOrSelf]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    ## TODO: Exclude for now
    @extend_schema(exclude=True)
    def create(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def _create_key(self, member, filename: str) -> str:
        date = timezone.now().strftime("%Y%m%d")
        return f"profiles/{member.id}/{date}-{filename}"

    @extend_schema(exclude=True)
    def update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @action(detail=True, methods=["post"], url_path="avatar/presign")
    def avatar_presign(self, request, pk=None):
        member = self.get_object()

        filename = request.data.get("filename")
        content_type = request.data.get("content_type")
        size = request.data.get("size")

        if not filename or not content_type or not size:
            raise SNUBaseballException("파일 이름과 콘텐츠 타입이 필요합니다.")

        key = self._create_key(member, filename)

        try:
            result = get_presigned_post(key, content_type, size)
        except Exception as e:
            raise SNUBaseballException("Presign URL 생성에 실패했습니다.") from e

        if not result:
            raise SNUBaseballException("Presign URL 생성에 실패했습니다.")

        return Response(data=result, status=status.HTTP_200_OK)

    @action(detail=True, methods=["put"], url_path="avatar/complete")
    def avatar_complete(self, request, pk=None):
        member = self.get_object()

        key = request.data.get("key")

        if not key:
            raise SNUBaseballException("키가 필요합니다.")

        expected_prefix = f"profiles/{member.id}/"
        if not key.startswith(expected_prefix):
            raise SNUBaseballException("유효하지 않은 키입니다.")

        img, _ = SNUBaseballImage.objects.update_or_create(
            key=key,
            defaults={
                "original_filename": key.split("/")[-1],
                "mime": mimetypes.guess_type(key)[0] or "application/octet-stream",
                "size": 0,
                "uploaded_by": request.user,
            },
        )

        member.profile_image = img
        member.save(update_fields=["profile_image"])

        return Response(data={"url": get_image_url(img.key)}, status=status.HTTP_200_OK)
