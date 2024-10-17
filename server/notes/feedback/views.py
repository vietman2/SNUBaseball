from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Feedback
from .serializers import FeedbackSimpleSerializer, FeedbackDetailSerializer

class FeedbackView(ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSimpleSerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get']

    @extend_schema(summary="피드백 조회", tags=["피드백 관리"])
    def list(self, request, *args, **kwargs):
        ## return by status: {new: list, in_progress: list, done: list}
        ## max 10 items each
        new_feedbacks = Feedback.objects.filter(status=0)[:10]
        in_progress_feedbacks = Feedback.objects.filter(status=1)[:10]
        under_review_feedbacks = Feedback.objects.filter(status=2)[:10]
        done_feedbacks = Feedback.objects.filter(status=3)[:10]

        new_serializer = FeedbackSimpleSerializer(new_feedbacks, many=True)
        in_progress_serializer = FeedbackSimpleSerializer(in_progress_feedbacks, many=True)
        under_review_serializer = FeedbackSimpleSerializer(under_review_feedbacks, many=True)
        done_serializer = FeedbackSimpleSerializer(done_feedbacks, many=True)

        return Response({
            'new': new_serializer.data,
            'in_progress': in_progress_serializer.data,
            'under_review': under_review_serializer.data,
            'done': done_serializer.data
        }, status=status.HTTP_200_OK)

    @extend_schema(summary="피드백 상세 조회", tags=["피드백 관리"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = FeedbackDetailSerializer(instance)

        serializer.increment_num_views()
        serializer.content_viewed(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)
