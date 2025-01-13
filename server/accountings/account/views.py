from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdmin
from .models import Account
from .serializers import AccountSerializer

class AccountView(ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAdmin]
    http_method_names = ['get']

    @extend_schema(summary="계정 조회", tags=["계정 관리"])
    def list(self, request, *args, **kwargs):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
