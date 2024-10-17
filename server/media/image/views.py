from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Image
from .serializers import ImageUploadSerializer

class ImageView(ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageUploadSerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['post']

    @extend_schema(summary="이미지 업로드", tags=["이미지 관리"])
    def create(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)
        serializer.context['request'] = request
        
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
