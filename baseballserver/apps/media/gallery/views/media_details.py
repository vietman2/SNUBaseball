from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from ..models import GalleryImage, GalleryVideo
from ..permissions import IsOpsOrUploader
from ..serializers import GalleryImageSerializer, GalleryVideoSerializer


class GalleryImageDetailsAPIView(ModelViewSet):
    """
    갤러리 이미지 수정 / 삭제 API
        - 이미지 수정 / 삭제 기능 제공
        - 권한이 있는 사용자만 접근 가능
    """

    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    permission_classes = [IsOpsOrUploader]
    http_method_names = ["patch", "delete", "head", "options"]

    def destroy(self, request, *args, **kwargs):
        """
        갤러리 이미지 삭제
        """
        instance = self.get_object()
        instance.is_deleted = True
        instance.deleted_at = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)


class GalleryVideoDetailsAPIView(ModelViewSet):
    """
    갤러리 비디오 수정 / 삭제 API
        - 비디오 수정 / 삭제 기능 제공
        - 권한이 있는 사용자만 접근 가능
    """

    queryset = GalleryVideo.objects.all()
    serializer_class = GalleryVideoSerializer
    permission_classes = [IsOpsOrUploader]
    http_method_names = ["patch", "delete", "head", "options"]

    def destroy(self, request, *args, **kwargs):
        """
        갤러리 비디오 삭제
        """
        instance = self.get_object()
        instance.is_deleted = True
        instance.deleted_at = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)
