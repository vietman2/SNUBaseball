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
from .utils import get_error_message

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
            error_message = get_error_message(e)
            return Response(data={
                "error": error_message,
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
    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def retrieve(self, request, id):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class PersonViewSet(ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [AllowAny,]
    throttle_scope = 'dj_rest_auth'
    http_method_names = ['get', 'post', 'head', 'options']
    lookup_field = 'id'

    @extend_schema(summary="사용자 정보 조회", tags=["회원 관리"])
    def list(self, request):
        queryset = self.get_queryset()
        filter = request.query_params.get('filter', None)

        q = Q()

        if filter == "YB":
            q &= Q(status=1)
        elif filter == "OB":
            q &= Q(status=3)
        elif filter == "지도자":
            q &= Q(role=3)
        else:
            q &= ~Q(status__in=[1, 3])

        queryset = queryset.filter(q)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def retrieve(self, request, id):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @extend_schema(summary="사용자 정보 추가", tags=["회원 관리"])
    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            error_message = get_error_message(e)
            return Response(data={
                "error": error_message,
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
