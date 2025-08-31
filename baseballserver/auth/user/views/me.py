from rest_framework.response import Response
from rest_framework.views import APIView

from auth.permissions import IsAuthenticated
from auth.user.serializers import UserProfileSerializer


class MeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
