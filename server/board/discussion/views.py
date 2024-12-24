from django.db.models import Q
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAuthor, IsAuthorOrAdmin
from .serializers import (
    DiscussionSimpleSerializer, DiscussionDetailSerializer,
    DiscussionWriteSerializer, DiscussionCommentSerializer
)
from .models import Discussion, DiscussionLike, DiscussionComment

class DiscussionView(ModelViewSet):
    queryset = Discussion.objects.filter(is_deleted=False)
    serializer_class = DiscussionSimpleSerializer
    http_method_names = ['get', 'post', 'delete', 'put']

    def get_permissions(self):
        ## Edit can only be done by author
        if self.action in ['update']:
            return [IsAuthor(),]

        ## Delete can only be done by author or admin
        if self.action in ['destroy']:
            return [IsAuthorOrAdmin(),]

        ## otherwise only authenticated users can access
        return [IsAuthenticated(),]

    @extend_schema(summary="게시글 생성", tags=["게시글 관리"])
    def create(self, request, *args, **kwargs):
        serializer = DiscussionWriteSerializer(data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="게시글 조회", tags=["게시글 관리"])
    def list(self, request, *args, **kwargs):
        query = request.query_params.get('query', None)

        q = Q()
        q &= Q(is_deleted=False)

        if query:
            q &= (Q(title__icontains=query) | Q(content__icontains=query))

        discussions = Discussion.objects.filter(q).order_by('-created_at')
        serializer = DiscussionSimpleSerializer(discussions, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="게시글 상세 조회", tags=["게시글 관리"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = DiscussionDetailSerializer(instance)
        serializer.context['request'] = request

        serializer.increment_num_views()
        serializer.content_viewed(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="게시글 수정", tags=["게시글 관리"])
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = DiscussionWriteSerializer(instance, data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="게시글 삭제", tags=["게시글 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.deleted_at = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(summary="게시글 좋아요", tags=["게시글 관리"])
    @action(detail=True, methods=['post'])
    def like(self, request, *args, **kwargs):
        instance = self.get_object()

        if DiscussionLike.objects.filter(discussion=instance, user=request.user).exists():
            DiscussionLike.objects.get(discussion=instance, user=request.user).delete()
        else:
            DiscussionLike.objects.create(discussion=instance, user=request.user)

        return Response(status=status.HTTP_200_OK)

class DiscussionCommentView(ModelViewSet):
    queryset = DiscussionComment.objects.filter(is_deleted=False)
    serializer_class = DiscussionCommentSerializer
    http_method_names = ['post', 'delete', 'put']

    def get_permissions(self):
        ## Edit can only be done by author
        if self.action in ['update']:
            return [IsAuthor(),]

        ## Delete can only be done by author or admin
        if self.action in ['destroy']:
            return [IsAuthorOrAdmin(),]

        ## otherwise only authenticated users can access
        return [IsAuthenticated(),]

    @extend_schema(summary="댓글 생성", tags=["게시글 관리"])
    def create(self, request, *args, **kwargs):
        serializer = DiscussionCommentSerializer(data=request.data)
        discussion = Discussion.objects.get(id=kwargs['discussion_id'])
        serializer.context['request'] = request
        serializer.context['discussion'] = discussion

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="댓글 수정", tags=["게시글 관리"])
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = DiscussionCommentSerializer(instance, data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="댓글 삭제", tags=["게시글 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.deleted_at = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
