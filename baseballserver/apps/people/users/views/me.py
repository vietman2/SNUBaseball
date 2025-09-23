from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from rest_framework.views import APIView

from core.auth import IsAuthenticated
from ..serializers import UserProfileSerializer


class MeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(summary="내 정보 조회", tags=["회원 관리"])
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
