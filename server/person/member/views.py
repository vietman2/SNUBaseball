from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Member
from .serializers import MemberSimpleSerializer

class MemberViewSet(ModelViewSet):
    serializer_class = MemberSimpleSerializer
    queryset = Member.objects.all()
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get']

    @extend_schema(summary="회원 상세 조회", tags=["회원 관리"])
    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @extend_schema(summary="회원 목록 조회", tags=["회원 관리"])
    def list(self, request, *args, **kwargs):
        ## 필터
        filter = request.query_params.get('filter', None)

        if filter is None or str(filter) == "":
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if str(filter) == "ybs":
            roles = [1, 2, 3, 4, 5]
            stati = [1, 2, 3]
            self.queryset = self.queryset.filter(status__in=stati, role__in=roles)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
