from django.db.models import Q
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .serializers import (
    NoticeSimpleSerializer, NoticeDetailSerializer,
    NoticeCategorySerializer, NoticeWriteSerializer,
    NoticeCommentSerializer
)
from .models import Notice, NoticeCategory, NoticeComment, NoticeLike

class NoticeView(ModelViewSet):
    queryset = Notice.objects.filter(is_deleted=False)
    serializer_class = NoticeSimpleSerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get', 'post', 'delete', 'put']

    @extend_schema(summary="공지 생성", tags=["공지 관리"])
    def create(self, request, *args, **kwargs):
        serializer = NoticeWriteSerializer(data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="공지 조회", tags=["공지 관리"])
    def list(self, request, *args, **kwargs):
        query = request.query_params.get('query', None)
        category_filter = request.query_params.get('category', None)

        q = Q()
        q &= Q(is_deleted=False)

        if query:
            q &= (Q(title__icontains=query) | Q(content__icontains=query))
        if category_filter:
            category = NoticeCategory.objects.get(label=category_filter)
            q &= Q(category=category)

        notices = Notice.objects.filter(q).order_by('-created_at')
        serializer = NoticeSimpleSerializer(notices, many=True)

        categories = NoticeCategory.objects.all()
        category_serializer = NoticeCategorySerializer(categories, many=True)

        response_data = {
            'notices': serializer.data,
            'categories': category_serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)

    @extend_schema(summary="공지 상세 조회", tags=["공지 관리"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = NoticeDetailSerializer(instance)
        serializer.context['request'] = request

        serializer.increment_num_views()
        serializer.content_viewed(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="공지 수정", tags=["공지 관리"])
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = NoticeWriteSerializer(instance, data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="공지 삭제", tags=["공지 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.updated_at = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(summary="공지 분류 조회", tags=["공지 관리"])
    @action(detail=False, methods=['get'])
    def categories(self, request, *args, **kwargs):
        categories = NoticeCategory.objects.all()
        serializer = NoticeCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="공지 좋아요", tags=["공지 관리"])
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated,])
    def like(self, request, *args, **kwargs):
        instance = self.get_object()

        ## 좋아요 토글
        if NoticeLike.objects.filter(notice=instance, user=request.user).exists():
            instance.noticelike_set.get(user=request.user).delete()
        else:
            NoticeLike.objects.create(notice=instance, user=request.user)

        return Response(status=status.HTTP_200_OK)

class NoticeCommentView(ModelViewSet):
    queryset = NoticeComment.objects.filter(is_deleted=False)
    serializer_class = NoticeCommentSerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['post', 'delete', 'put']

    @extend_schema(summary="댓글 생성", tags=["공지 관리"])
    def create(self, request, *args, **kwargs):
        serializer = NoticeCommentSerializer(data=request.data)
        notice = Notice.objects.get(id=kwargs['notice_id'])
        serializer.context['request'] = request
        serializer.context['notice'] = notice

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="댓글 수정", tags=["공지 관리"])
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = NoticeCommentSerializer(instance, data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="댓글 삭제", tags=["공지 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.updated_at = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
