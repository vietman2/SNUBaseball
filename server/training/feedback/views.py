from django.db.models import Q
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from person.member.models import Member
from .models import Feedback, FeedbackComment, FeedbackCategory
from .serializers import (
    FeedbackSimpleSerializer, FeedbackDetailSerializer, FeedbackCommentSerializer, 
    FeedbackCategorySerializer
)

class FeedbackView(ModelViewSet):
    queryset = Feedback.objects.filter(is_deleted=False)
    serializer_class = FeedbackSimpleSerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get', 'post', 'delete']

    @extend_schema(summary="피드백 조회", tags=["피드백 관리"])
    def list(self, request, *args, **kwargs):
        query = request.query_params.get('query', None)
        category_filter = request.query_params.get('category', None)
        player_filter = request.query_params.get('player', None)

        q = Q()
        q &= Q(is_deleted=False)

        if query:
            q &= (Q(title__icontains=query) | Q(content__icontains=query))
        if category_filter:
            category = FeedbackCategory.objects.get(label=category_filter)
            q &= Q(category=category)
        if player_filter:
            player = Member.objects.get(pk=player_filter)
            q &= Q(player__member=player)

        feedbacks = Feedback.objects.filter(q).order_by('-created_at')
        serializer = FeedbackSimpleSerializer(feedbacks, many=True)

        categories = FeedbackCategory.objects.all()
        category_serializer = FeedbackCategorySerializer(categories, many=True)

        response_data = {
            'feedbacks': serializer.data,
            'classifications': category_serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)

    @extend_schema(summary="피드백 상세 조회", tags=["피드백 관리"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = FeedbackDetailSerializer(instance)

        serializer.increment_num_views()
        serializer.content_viewed(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="피드백 삭제", tags=["피드백 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.updated_at = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)

class FeedbackCommentView(ModelViewSet):
    queryset = FeedbackComment.objects.filter(is_deleted=False)
    serializer_class = FeedbackCommentSerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['post', 'delete', 'put']

    @extend_schema(summary="피드백 댓글 작성", tags=["피드백 관리"])
    def create(self, request, *args, **kwargs):
        serializer = FeedbackCommentSerializer(data=request.data)
        feedback = Feedback.objects.get(id=kwargs['feedback_id'])
        serializer.context['request'] = request
        serializer.context['feedback'] = feedback

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({
                'message': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="피드백 댓글 수정", tags=["피드백 관리"])
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = FeedbackCommentSerializer(instance, data=request.data)
        serializer.context['request'] = request

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response({
                'message': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="피드백 댓글 삭제", tags=["피드백 관리"])
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.updated_at = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)
