from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import College
from .serializers import CollegeSerializer

class MajorViewSet(ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer
    permission_classes = [AllowAny,]
    throttle_scope = 'dj_rest_auth'
    http_method_names = ['get', 'head', 'options']
    lookup_field = 'id'

    @extend_schema(summary="전공 목록 조회", tags=["회원 관리"])
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
