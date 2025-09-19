from rest_framework.response import Response
from rest_framework.views import APIView

from core.auth import IsAuthenticated
from ..serializers import UserProfileSerializer


class MeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
