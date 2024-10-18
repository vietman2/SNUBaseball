from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import (
    InformationSimpleSerializer, InformationDetailSerializer, InformationWriteSerializer
)
from .models import Information

class InformationView(ModelViewSet):
    queryset = Information.objects.filter(is_deleted=False)
    serializer_class = InformationSimpleSerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get', 'post', 'delete', 'put']

    @extend_schema(summary="정보 생성", tags=["정보 관리"])
    def create(self, request, *args, **kwargs):
        serializer = InformationWriteSerializer(data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="정보 조회", tags=["정보 관리"])
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(summary="정보 상세 조회", tags=["정보 관리"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = InformationDetailSerializer(instance)

        serializer.increment_num_views()
        serializer.content_viewed(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="정보 수정", tags=["정보 관리"])
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = InformationWriteSerializer(instance, data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @extend_schema(summary="정보 삭제", tags=["정보 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.updated_at = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
