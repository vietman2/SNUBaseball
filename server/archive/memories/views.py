from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Memory
from .serializers import MemoryListSerializer, ImageUploadSerializer

class MemoryViewSet(ModelViewSet):
    queryset = Memory.objects.all()
    serializer_class = MemoryListSerializer ## TODO: change this later
    throttle_scope = 'dj_rest_auth'
    http_method_names = ['get', 'post']

    @extend_schema(summary="순간의 기록 조회", tags=["아카이브 관리"])
    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
