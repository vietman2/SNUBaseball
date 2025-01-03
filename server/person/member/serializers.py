from django.utils import timezone
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from person.major.models import Department
from .enums import StatusType, HandsType, RoleType
from .models import Member
from .utils import (
    get_role_chip, get_status_chip, get_num_semester_text,
    get_profile_image_url, is_valid_student_id
)

class MemberSimpleSerializer(ModelSerializer):
    role            = serializers.SerializerMethodField()
    name            = serializers.CharField(source='full_name')
    profile_image   = serializers.SerializerMethodField()
    hands           = serializers.CharField(source='get_hands_display')
    major           = serializers.SerializerMethodField()
    phone           = serializers.SerializerMethodField()
    date_joined     = serializers.DateField(format="%Y/%m")
    num_semester    = serializers.SerializerMethodField()
    status          = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = [
            "id", "role", "name", "position", "hands", "student_id", "profile_image",
            "major", "phone", "email", "date_joined", "num_semester", "status", "back_number"
        ]

    def get_role(self, obj):
        return get_role_chip(obj.role)

    def get_profile_image(self, obj):
        return get_profile_image_url(obj.profile_image)

    def get_num_semester(self, obj):
        return get_num_semester_text(obj.num_semester, obj.status)

    def get_status(self, obj):
        return get_status_chip(obj.status)

    def get_major(self, obj):
        if obj.major is None:
            return None

        return obj.major.name

    def get_phone(self, obj):
        if obj.phone is None:
            return None
        return obj.phone.as_national

class MemberDetailSerializer(ModelSerializer):
    role            = serializers.CharField(source='get_role_display')
    name            = serializers.CharField(source='full_name')
    profile_image   = serializers.SerializerMethodField()
    hands           = serializers.CharField(source='get_hands_display')
    major           = serializers.SerializerMethodField()
    phone           = serializers.SerializerMethodField()
    date_joined     = serializers.DateField(format="%Y/%m")
    num_semester    = serializers.SerializerMethodField()
    status          = serializers.SerializerMethodField()
    is_elite        = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = [
            "id", "role", "name", "position", "hands", "student_id", "profile_image", "major",
            "phone", "email", "date_joined", "num_semester", "status", "back_number", "is_elite"
        ]

    def get_profile_image(self, obj):
        return get_profile_image_url(obj.profile_image)

    def get_major(self, obj):
        if obj.major is None:
            return None

        return obj.major.name

    def get_phone(self, obj):
        return obj.phone.as_national

    def get_num_semester(self, obj):
        return get_num_semester_text(obj.num_semester, obj.status)

    def get_status(self, obj):
        return get_status_chip(obj.status)

    def get_is_elite(self, obj):
        if obj.is_elite:
            return "O"

        return "X"

class MemberWriteSerializer(ModelSerializer):
    student_id      = serializers.CharField(error_messages={'required': '학번을 입력해주세요.'})
    birth_date      = serializers.DateField(required=False)
    major           = serializers.IntegerField(error_messages={'required': '학과를 선택해주세요.'})
    role            = serializers.CharField()
    status          = serializers.ChoiceField(choices=StatusType.choices, required=False)
    address         = serializers.CharField(required=False)
    notes           = serializers.CharField(required=False)
    date_joined     = serializers.DateField(required=False)
    num_semester    = serializers.IntegerField(required=False)
    profile_image   = serializers.ImageField(required=False)
    position        = serializers.CharField(required=False)
    hands           = serializers.ChoiceField(choices=HandsType.choices, required=False)
    back_number     = serializers.IntegerField(required=False)

    class Meta:
        model = Member
        fields = [
            "student_id", "first_name", "last_name", "birth_date", "major", "role",
            "status", "phone", "email", "address", "notes", "date_joined", "num_semester",
            "profile_image", "position", "hands", "back_number", "is_elite"
        ]

    def validate_student_id(self, value):
        if not is_valid_student_id(value):
            raise serializers.ValidationError("학번 형식이 올바르지 않습니다.")

        return value

    def validate_role(self, value):
        if value == "선수":
            return RoleType.PLAYER
        elif value == "매니저":
            return RoleType.MANAGER

        raise serializers.ValidationError("역할이 올바르지 않습니다.")

    def create(self, validated_data):
        ## TODO: 프로필 사진 로직
        #profile_image = validated_data.pop('profile_image', None)
        admission_year = validated_data['student_id'][:4]
        validated_data['admission_year'] = admission_year

        major = Department.objects.get(id=validated_data.pop('major'))
        validated_data['major'] = major

        validated_data['date_joined'] = validated_data.get('date_joined', timezone.now().date())

        if 'status' not in validated_data:
            validated_data['status'] = StatusType.ACTIVE
        if validated_data['role'] == RoleType.MANAGER:
            validated_data['position'] = '매니저'

        member = Member.objects.create(**validated_data)

        return member
