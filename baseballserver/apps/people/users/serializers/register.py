from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from apps.people.members.api import Member
from core.error_handling import SNUBaseballException
from ..models import User
from ..validators import UsernameValidator

PASSWORD_ERROR_MESSAGES = {
    "required": "비밀번호를 입력해주세요.",
    "blank": "비밀번호를 입력해주세요.",
}


class RegisterSerializer(ModelSerializer):
    """
    회원가입 시 사용하는 Serializer
    """

    member = serializers.PrimaryKeyRelatedField(
        queryset=Member.objects.all(),
        error_messages={
            "required": "회원 정보를 입력해주세요.",
            "does_not_exist": "존재하지 않는 회원입니다.",
        },
    )
    student_id = serializers.CharField(
        write_only=True,
        error_messages={
            "required": "학번을 입력해주세요.",
            "blank": "학번을 입력해주세요.",
        },
    )
    username = serializers.CharField(
        max_length=150,
        min_length=4,
        error_messages={
            "required": "아이디를 입력해주세요.",
            "blank": "아이디를 입력해주세요.",
        },
    )
    password = serializers.CharField(
        write_only=True,
        error_messages=PASSWORD_ERROR_MESSAGES,
    )
    password2 = serializers.CharField(
        write_only=True,
        error_messages=PASSWORD_ERROR_MESSAGES,
    )

    class Meta:
        model = User
        fields = ["member", "student_id", "username", "password", "password2"]

    def validate_password(self, value):
        validate_password(value)
        return value

    def validate_username(self, value):
        validator = UsernameValidator()
        validator(value)
        return value

    def validate_member(self, value):
        if User.objects.filter(member=value).exists():
            raise SNUBaseballException("이미 가입된 회원입니다.")
        return value

    def validate(self, attrs):
        ## 비밀번호 2개가 일치하는지 확인
        if attrs["password"] != attrs["password2"]:
            raise SNUBaseballException("비밀번호가 일치하지 않습니다.")
        ## 입력된 회원의 학번과 입력된 학번이 일치하는지 확인
        if attrs["member"].student_id != attrs["student_id"]:
            raise SNUBaseballException("학번이 일치하지 않습니다.")

        ## attrs에서 student_id와 password2를 제거
        attrs.pop("student_id", None)
        attrs.pop("password2", None)

        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            member=validated_data["member"],
            password=validated_data["password"],
        )
        user.save()
        return user
