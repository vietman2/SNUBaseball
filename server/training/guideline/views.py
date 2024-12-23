from django.db.models import Q
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import GuidelineCategory, Guideline, GuidelineComment, GuidelineLike
from .serializers import (
    GuidelineSimpleSerializer, GuidelineDetailSerializer,
    GuidelineWriteSerializer, GuidelineCommentSerializer
)

class GuidelineView(ModelViewSet):
    queryset = Guideline.objects.filter(is_deleted=False)
    serializer_class = GuidelineSimpleSerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get', 'post', 'delete', 'put']

    @extend_schema(summary="가이드라인 목록 조회", tags=["가이드라인 관리"])
    def list(self, request, *args, **kwargs):
        selected_category = request.query_params.get('category', None)

        if selected_category is None:
            return Response({
                'message': '잘못된 요청입니다.'
            }, status=status.HTTP_400_BAD_REQUEST)

        category = GuidelineCategory.objects.get(name=selected_category)
        filter = request.query_params.get('filter', None)

        q = Q(category=category, is_deleted=False)

        if filter == "드릴":
            q &= Q(is_drill=True)
        elif filter == "예시":
            q &= Q(is_drill=False)
        elif filter != "전체":
            return Response({
                'message': '잘못된 요청입니다.'
            }, status=status.HTTP_400_BAD_REQUEST)

        guidelines = Guideline.objects.filter(q).order_by('-created_at')
        serializer = GuidelineSimpleSerializer(guidelines, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="가이드라인 상세 조회", tags=["가이드라인 관리"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = GuidelineDetailSerializer(instance)
        serializer.context['request'] = request

        serializer.increment_num_views()
        serializer.content_viewed(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="가이드라인 작성", tags=["가이드라인 관리"])
    def create(self, request, *args, **kwargs):
        serializer = GuidelineWriteSerializer(data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="가이드라인 수정", tags=["가이드라인 관리"])
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = GuidelineWriteSerializer(instance, data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="가이드라인 삭제", tags=["가이드라인 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.updated_at = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(summary="가이드라인 좋아요", tags=["가이드라인 관리"])
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated,])
    def like(self, request, *args, **kwargs):
        instance = self.get_object()

        ## 좋아요 토글
        if GuidelineLike.objects.filter(guideline=instance, user=request.user).exists():
            GuidelineLike.objects.filter(guideline=instance, user=request.user).delete()
        else:
            GuidelineLike.objects.create(guideline=instance, user=request.user)

        return Response(status=status.HTTP_204_NO_CONTENT)

class GuidelineCommentView(ModelViewSet):
    queryset = GuidelineComment.objects.filter(is_deleted=False)
    serializer_class = GuidelineCommentSerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['post', 'delete', 'put']

    @extend_schema(summary="가이드라인 댓글 작성", tags=["가이드라인 관리"])
    def create(self, request, *args, **kwargs):
        serializer = GuidelineCommentSerializer(data=request.data)
        guideline = Guideline.objects.get(id=kwargs['guideline_id'])
        serializer.context['request'] = request
        serializer.context['guideline'] = guideline

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="가이드라인 댓글 수정", tags=["가이드라인 관리"])
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = GuidelineCommentSerializer(instance, data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="가이드라인 댓글 삭제", tags=["가이드라인 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.updated_at = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
