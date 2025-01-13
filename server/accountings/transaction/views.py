from django.db import transaction as db_transaction
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdmin
from .models import Transaction
from .serializers import TransactionSerializer
from .utils import update_balance

class TransactionView(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAdmin]
    http_method_names = ['get', 'post', 'put', 'delete']

    @extend_schema(summary="거래 조회", tags=["거래 관리"])
    def list(self, request, *args, **kwargs):
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="거래 상세 조회", tags=["거래 관리"])
    def retrieve(self, request, *args, **kwargs):
        transaction = self.get_object()
        serializer = TransactionSerializer(transaction)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="거래 생성", tags=["거래 관리"])
    def create(self, request, *args, **kwargs):
        serializer = TransactionSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(summary="거래 수정", tags=["거래 관리"])
    def update(self, request, *args, **kwargs):
        transaction = self.get_object()
        serializer = TransactionSerializer(transaction, data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="거래 삭제", tags=["거래 관리"])
    def destroy(self, request, *args, **kwargs):
        transaction = self.get_object()
        with db_transaction.atomic():
            difference = transaction.amount if transaction.type == "수입" else -transaction.amount
            update_balance(transaction, -difference)

            transaction.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
