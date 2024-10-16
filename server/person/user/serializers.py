from django.conf import settings
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.validators import UsernameValidator
from person.member.enums import RoleType
from person.member.models import Member
from .models import User

class ProfileSerializer(ModelSerializer):
    name            = serializers.SerializerMethodField()
    profile_image   = serializers.SerializerMethodField()
    is_admin        = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'uuid',
            'name',
            'profile_image',
            'is_admin'
        ]

    def get_name(self, obj):
        return obj.member.full_name

    def get_profile_image(self, obj):
        if obj.member.profile_image is None:
            return settings.FALLBACK_IMAGE

        return obj.member.profile_image.image.url

    def get_is_admin(self, obj):
        ## TODO: 주장, 부주장 로직 처리
        if obj.is_superuser:
            return True

        if obj.member.role == RoleType.MANAGER:
            return True

        return False

class AuthorSerializer(ModelSerializer):
    name            = serializers.SerializerMethodField()
    profile_image   = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'uuid',
            'name',
            'profile_image'
        ]

    def get_name(self, obj):
        return obj.member.full_name

    def get_profile_image(self, obj):
        if obj.member.profile_image is None:
            return settings.FALLBACK_IMAGE

        return obj.member.profile_image.image.url

class RegisterSerializer(ModelSerializer):
    member_id   = serializers.IntegerField(
        write_only=True,
        error_messages={
            'required': '오류가 발생했습니다.',
        }
    )
    username    = serializers.CharField(
        write_only=True,
        error_messages={
            'blank': '아이디를 입력해주세요.',
            'required': '아이디를 입력해주세요.',
        }
    )
    password    = serializers.CharField(
        write_only=True,
        error_messages={
            'blank': '비밀번호를 입력해주세요.',
            'required': '비밀번호를 입력해주세요.',
        }
    )
    password2   = serializers.CharField(
        write_only=True,
        error_messages={
            'blank': '비밀번호 확인을 입력해주세요.',
            'required': '비밀번호 확인을 입력해주세요.',
        }
    )

    class Meta:
        model = User
        fields = [
            'member_id',
            'username',
            'password',
            'password2'
        ]

    def validate_passwords(self, value):
        if value["password"] != value["password2"]:
            raise serializers.ValidationError({"password": ["비밀번호가 일치하지 않습니다."]})
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def validate_username(self, value):
        validator = UsernameValidator()
        validator(value)
        return value

    def validate_member_id(self, value):
        try:
            Member.objects.get(id=value)
        except Member.DoesNotExist:
            raise serializers.ValidationError("회원 정보가 존재하지 않습니다.")
        return value

    def create(self, validated_data):
        validated_data.pop("password2")
        person = Member.objects.get(id=validated_data.pop("member_id"))
        validated_data["member"] = person
        user = User.objects.create_user(**validated_data)
        return user

    def save(self, **kwargs):
        self.create(self.validated_data)
        return self.validated_data
