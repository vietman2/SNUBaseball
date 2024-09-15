from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.validators import UsernameValidator
from .person import College, Person
from .serializers import RegisterSerializer, CollegeSerializer, PersonSerializer

class RegisterView(GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes=[AllowAny,]
    throttle_scope = 'dj_rest_auth'
    http_method_names = ['post', 'head', 'options']

    @extend_schema(summary="회원 가입", tags=["회원 관리"])
    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.validate_passwords(serializer.validated_data)
            username_validator = UsernameValidator()

            username_validator(serializer.validated_data['username'])
        except ValidationError as e:
            return Response(data={
                "error": e.detail,
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class MajorViewSet(ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer
    permission_classes = [AllowAny,]
    throttle_scope = 'dj_rest_auth'
    http_method_names = ['get', 'head', 'options']
    lookup_field = 'id'

    @extend_schema(summary="전공 목록 조회", tags=["회원 관리"])
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class PersonViewSet(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [AllowAny,]
    throttle_scope = 'dj_rest_auth'
    http_method_names = ['get', 'post', 'head', 'options']
    lookup_field = 'id'

    @extend_schema(summary="사용자 정보 조회", tags=["회원 관리"])
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        member_type = request.query_params.get('filter', None)

        q = Q()

        if member_type == "YB":
            q &= Q(status=1)
        elif member_type == "OB":
            q &= Q(status=3)
        elif member_type == "지도자":
            q &= Q(role=3)
        else:
            q &= ~Q(status__in=[1, 3])

        queryset = queryset.filter(q)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @extend_schema(summary="사용자 정보 추가", tags=["회원 관리"])
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        phone_number = request.data.get('phone', None)
        role = request.data.get('role', None)

        try:
            serializer.validate_phone(phone_number)
            serializer.validate_role(role)
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            return Response(data={
                "error": e.detail,
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
