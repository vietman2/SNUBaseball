from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.validators import UsernameValidator
from person.member.models import Member
from .models import User
from .serializers import RegisterSerializer, ProfileSerializer

class UserProfileView(ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = User.objects.all()
    http_method_names = ['get']

    @extend_schema(summary="프로필 조회", tags=["회원 관리"])
    def get(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

class RegisterView(GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes=[AllowAny,]
    throttle_scope = 'dj_rest_auth'
    http_method_names = ['post']

    def get_error_message(self, e):
        error_message = ""
        ## only the first error message is shown
        for key, value in e.detail.items():
            error_message = value[0]
            break
        return error_message

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
                "error": self.get_error_message(e)
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class StudentIdCheckView(GenericAPIView):
    permission_classes=[AllowAny,]
    http_method_names = ['get']

    @extend_schema(summary="학번 확인", tags=["회원 관리"])
    def get(self, request, *args, **kwargs):
        student_id = request.query_params.get('student_id', None)
        if not student_id:
            return Response(data={
                "error": "학번을 입력해주세요."
            }, status=status.HTTP_400_BAD_REQUEST)

        ## Member object가 있으면서, User object가 없는 경우만 가입이 가능하다
        ## 즉, Member object가 있으면서 User object가 있는 경우는 이미 가입한 경우이고
        ## Member object가 없는 경우는 가입이 불가능한 경우이다

        try:
            member = Member.objects.get(student_id=student_id)
        except Member.DoesNotExist:
            return Response(data={
                "error": "학번이 존재하지 않습니다. 주장단에 문의해주세요."
            }, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(member=member).exists():
            return Response(data={
                "error": "이미 가입된 학번입니다."
            }, status=status.HTTP_400_BAD_REQUEST)

        data = { "name": member.full_name, "id": member.id }

        return Response(data, status=status.HTTP_200_OK)
