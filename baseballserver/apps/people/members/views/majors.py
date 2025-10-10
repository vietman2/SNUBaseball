from drf_spectacular.utils import extend_schema
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin

from core.auth import AllowAny
from ..models import College
from ..serializers import CollegeSerializer


class MajorListAPIView(GenericAPIView, ListModelMixin):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer
    permission_classes = [AllowAny]
    http_method_names = ["get", "head", "options"]

    @extend_schema(summary="전공 목록 조회", tags=["전공 목록"])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
