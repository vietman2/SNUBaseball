from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.validators import UsernameValidator, EmailValidator
from .models import User

class RegisterSerializer(ModelSerializer):
    password    = serializers.CharField(write_only=True)
    password2   = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'phone',
            'password',
            'password2',
            'first_name',
            'last_name'
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

    def validate_email(self, value):
        validator = EmailValidator()
        validator(value)
        return value

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        #UserProfile.objects.create(user=user)
        return user

    def save(self, **kwargs):
        self.create(self.validated_data)
        return self.validated_data
