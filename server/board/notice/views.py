from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import (
    NoticeSimpleSerializer, NoticeDetailSerializer,
    NoticeCategorySerializer, NoticeCreateSerializer
)
from .models import Notice, NoticeCategory

class NoticeView(ModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = NoticeSimpleSerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get', 'post']

    @extend_schema(summary="공지 생성", tags=["공지 관리"])
    def create(self, request, *args, **kwargs):
        serializer = NoticeCreateSerializer(data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="공지 조회", tags=["공지 관리"])
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(summary="공지 상세 조회", tags=["공지 관리"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = NoticeDetailSerializer(instance)

        serializer.increment_num_views()
        serializer.content_viewed(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="공지 분류 조회", tags=["공지 관리"])
    @action(detail=False, methods=['get'])
    def categories(self, request, *args, **kwargs):
        categories = NoticeCategory.objects.all()
        serializer = NoticeCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
