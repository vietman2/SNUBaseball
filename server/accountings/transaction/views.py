from django.db import transaction as db_transaction
from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdmin
from .models import Transaction
from .serializers import TransactionSerializer
from .utils import update_balance, get_type

class TransactionPageNumberPagination(PageNumberPagination):
    page_size = 200
    page_size_query_param = 'page_size'
    max_page_size = 1000
    
    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
            'num_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
        })

class TransactionView(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    pagination_class = TransactionPageNumberPagination
    permission_classes = [IsAdmin]
    http_method_names = ['get', 'post', 'put', 'delete']

    @extend_schema(summary="거래 조회", tags=["거래 관리"])
    def list(self, request, *args, **kwargs):
        month = request.query_params.get('month', None)
        account = request.query_params.get('account', None)
        type_query = request.query_params.get('type', None)
        query = request.query_params.get('query', None)

        q = Q()
        if month:
            ## month is given as 'YYYY-MM'
            q &= Q(date__year=month.split('-')[0], date__month=month.split('-')[1])
        if account:
            q &= Q(account__id=account)
        if type_query:
            q &= Q(type=get_type(type_query))
        if query:
            q &= Q(description__icontains=query) | Q(notes__icontains=query)

        queryset = Transaction.objects.filter(q).order_by('-date', '-id')
        page = self.paginate_queryset(queryset)
        serializer = TransactionSerializer(page, many=True)

        return self.get_paginated_response(serializer.data)

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
