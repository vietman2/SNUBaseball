from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import InformationSimpleSerializer, InformationDetailSerializer
from .models import Information

class InformationView(ModelViewSet):
    queryset = Information.objects.all()
    serializer_class = InformationSimpleSerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get']

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
