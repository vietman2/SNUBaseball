from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.files.storage import default_storage
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, ValidationError
from phonenumber_field.validators import validate_international_phonenumber

from core.validators import UsernameValidator
from .enums import RoleType
from .models import User
from .person import College, Department, Person

class RegisterSerializer(ModelSerializer):
    password    = serializers.CharField(write_only=True)
    password2   = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
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

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        #UserProfile.objects.create(user=user)
        return user

    def save(self, **kwargs):
        self.create(self.validated_data)
        return self.validated_data

class PersonSerializer(ModelSerializer):
    name            = serializers.CharField(source='full_name', read_only=True)
    first_name      = serializers.CharField(write_only=True)
    last_name       = serializers.CharField(write_only=True)
    phone           = serializers.SerializerMethodField()
    role            = serializers.SerializerMethodField()
    status          = serializers.CharField(source='get_status_display', read_only=True)
    major           = serializers.CharField(source='major.name', read_only=True)
    profile_image   = serializers.ImageField(use_url=True)

    class Meta:
        model = Person
        fields = [
            'name',
            'first_name',
            'last_name',
            'birth_date',
            'admission_year',
            'student_id',
            'major',
            'role',
            'status',
            'phone',
            'email',
            'address',
            'notes',
            'profile_image'
        ]

    def get_role(self, obj):
        return obj.get_role_display()

    @extend_schema_field(serializers.CharField())
    def get_phone(self, obj):
        if obj.phone:
            return obj.phone.as_national

        return None

    def validate_phone(self, value):
        if value == None:
            return None

        try:
            validate_international_phonenumber(value)
        except DjangoValidationError:
            raise ValidationError("전화번호 형식이 올바르지 않습니다.")

        return value

    def validate_student_id(self, value):
        if not value:
            raise ValidationError("학번을 입력해주세요.")
        if not value[0:3].isdigit() or not value[4] == '-' or not value[5:].isdigit():
            raise ValidationError("학번 형식이 올바르지 않습니다.")

        return value

    def validate_admission_year(self, value):
        return value

    def validate_role(self, value):
        for choice in RoleType.choices:
            if value in choice:
                return choice[0]

        raise ValidationError("역할이 올바르지 않습니다.")

    def save(self, **kwargs):
        ## upload profile image
        image = self.validated_data.pop('profile_image')
        image_format = image.name.split('.')[-1]

        path = f"profiles/{self.validated_data['student_id']}.{image_format}"
        filename = default_storage.save(path, image)
        self.validated_data['profile_image'] = filename
        self.instance = Person.objects.create(**self.validated_data)

        return self.instance

class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = ["id", "name", "short_name"]

class CollegeSerializer(ModelSerializer):
    departments = DepartmentSerializer(many=True, read_only=True, source='department_set')

    class Meta:
        model = College
        fields = ['id', 'name', 'short_name', 'departments']
