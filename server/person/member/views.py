from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Member
from .serializers import MemberSimpleSerializer, MemberDetailSerializer, MemberWriteSerializer

class MemberViewSet(ModelViewSet):
    serializer_class = MemberSimpleSerializer
    queryset = Member.objects.all()
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get', 'post', 'delete']

    @extend_schema(summary="회원 상세 조회", tags=["회원 관리"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = MemberDetailSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="회원 목록 조회", tags=["회원 관리"])
    def list(self, request, *args, **kwargs):
        ## 필터
        query = request.query_params.get('filter', None)

        if query is None or str(query) == "":
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if str(query) == "ybs":
            roles = [1, 2, 3, 4, 5]
            stati = [1, 2, 3]
            self.queryset = self.queryset.filter(status__in=stati, role__in=roles)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        self.queryset = self.queryset.order_by('status', 'role', 'admission_year')

        serializer = MemberSimpleSerializer(self.queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="회원 생성", tags=["회원 관리"])
    def create(self, request, *args, **kwargs):
        serializer = MemberWriteSerializer(data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response({'message': "성공하였습니다!"}, status=status.HTTP_201_CREATED)

    @extend_schema(summary="회원 삭제", tags=["회원 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
