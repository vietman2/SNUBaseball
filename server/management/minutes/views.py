from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAuthor, IsAdmin
from .models import Minutes
from .serializers import MinutesSerializer

class MinutesViewSet(ModelViewSet):
    queryset = Minutes.objects.filter(is_deleted=False)
    serializer_class = MinutesSerializer
    http_method_names = ['get', 'post', 'delete', 'put']

    def get_permissions(self):
        if self.action in ['update']:
            return [IsAuthor(),]
        return [IsAdmin(),]

    @extend_schema(summary="회의록 생성", tags=["회의록 관리"])
    def create(self, request, *args, **kwargs):
        serializer = MinutesSerializer(data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="회의록 조회", tags=["회의록 관리"])
    def list(self, request, *args, **kwargs):
        query = request.query_params.get('query', None)

        q = Q()
        q &= Q(is_deleted=False)

        if query:
            q &= Q(title__icontains=query) | Q(content__icontains=query)

        minutes = Minutes.objects.filter(q)
        serializer = MinutesSerializer(minutes, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="회의록 상세 조회", tags=["회의록 관리"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = MinutesSerializer(instance)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="회의록 삭제", tags=["회의록 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(summary="회의록 수정", tags=["회의록 관리"])
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = MinutesSerializer(instance, data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
