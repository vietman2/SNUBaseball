from django.core.files.storage import default_storage
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Member
from .serializers import (
    MemberSimpleSerializer, MemberDetailSerializer, MemberWriteSerializer, MemberCreateSerializer
)

class MemberViewSet(ModelViewSet):
    serializer_class = MemberSimpleSerializer
    queryset = Member.objects.all()
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get', 'post', 'delete', 'put']

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
            serializer = MemberSimpleSerializer(self.queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        if str(query) == "ybs":
            roles = [1, 2, 3, 4, 5, 6]
            stati = [1]
            self.queryset = self.queryset.filter(status__in=stati, role__in=roles)
        elif str(query) == "obs":
            roles = [4, 5, 6]
            stati = [4]
            self.queryset = self.queryset.filter(status__in=stati, role__in=roles)
        elif str(query) == "others":
            stati = [1, 4]
            ## status 1, 4 제외
            self.queryset = self.queryset.exclude(status__in=stati)
        else:
            return Response({'message': "잘못된 쿼리입니다."}, status=status.HTTP_400_BAD_REQUEST)

        self.queryset = self.queryset.order_by('status', 'role', 'admission_year')

        serializer = MemberSimpleSerializer(self.queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="회원 생성", tags=["회원 관리"])
    def create(self, request, *args, **kwargs):
        serializer = MemberCreateSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': "성공하였습니다!"}, status=status.HTTP_201_CREATED)

    @extend_schema(summary="회원 삭제", tags=["회원 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(summary="회원 정보 수정", tags=["회원 관리"])
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = MemberWriteSerializer(instance, data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(summary="회원 프로필 사진 변경", tags=["회원 관리"])
    @action(detail=True, methods=['post'])
    def profiles(self, request, *args, **kwargs):
        instance = self.get_object()
        file = request.FILES.get('profile_image', None)

        if file is None:
            return Response({'message': "파일이 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

        filename = file.name.split("/")[-1]
        path = f"profiles/{instance.student_id}/{filename}"
        default_storage.save(path, file)
        instance.profile_image = path
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
