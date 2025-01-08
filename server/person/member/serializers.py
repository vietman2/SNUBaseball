from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from person.major.models import Department
from .models import Member
from .utils import (
    get_role_chip, get_status_chip, get_num_semester_text, get_profile_image_url,
    is_valid_student_id, get_status_choice, get_role_choice, get_hands_choice
)

class MemberMiniSerializer(ModelSerializer):
    admission_year = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = ["id", "full_name", "admission_year"]

    def get_admission_year(self, obj):
        return obj.admission_year % 100

class MemberSimpleSerializer(ModelSerializer):
    role            = serializers.SerializerMethodField()
    name            = serializers.CharField(source='full_name')
    profile_image   = serializers.SerializerMethodField()
    student_id      = serializers.SerializerMethodField()
    hands           = serializers.CharField(source='get_hands_display')
    major           = serializers.SerializerMethodField()
    phone           = serializers.SerializerMethodField()
    date_joined     = serializers.DateField(format="%Y/%m")
    num_semester    = serializers.SerializerMethodField()
    status          = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = [
            "id", "role", "name", "position", "hands", "student_id",
            "profile_image", "admission_year", "major", "phone", "email",
            "date_joined", "num_semester", "status", "back_number"
        ]

    def get_student_id(self, obj):
        if obj.student_id is None:
            return "-"
        return obj.student_id

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
            return "-"
        return obj.phone.as_national

class MemberDetailSerializer(ModelSerializer):
    role            = serializers.SerializerMethodField()
    name            = serializers.CharField(source='full_name')
    profile_image   = serializers.SerializerMethodField()
    birth_date      = serializers.DateField(format="%Y-%m-%d")
    hands           = serializers.CharField(source='get_hands_display')
    major           = serializers.SerializerMethodField()
    phone           = serializers.SerializerMethodField()
    date_joined     = serializers.DateField(format="%Y-%m-%d")
    status          = serializers.SerializerMethodField()
    is_elite        = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = [
            "id", "role", "name", "position", "hands", "student_id",
            "profile_image", "major", "admission_year", "birth_date",
            "phone", "email", "address", "date_joined", "num_semester",
            "notes", "status", "back_number", "is_elite"
        ]

    def get_role(self, obj):
        return get_role_chip(obj.role)

    def get_profile_image(self, obj):
        return get_profile_image_url(obj.profile_image)

    def get_major(self, obj):
        if obj.major is None:
            return None

        return obj.major.name

    def get_phone(self, obj):
        if obj.phone is None:
            return "-"
        return obj.phone.as_national

    def get_status(self, obj):
        return get_status_chip(obj.status)

    def get_is_elite(self, obj):
        if obj.is_elite:
            return "O"

        return "X"

class MemberCreateSerializer(ModelSerializer):
    class Meta:
        model = Member
        fields = ["first_name", "last_name", "admission_year"]

class MemberWriteSerializer(ModelSerializer):
    student_id      = serializers.CharField(allow_null=True)
    birth_date      = serializers.DateField(allow_null=True)
    major           = serializers.IntegerField(allow_null=True)
    role            = serializers.CharField()
    status          = serializers.CharField()
    hands           = serializers.CharField(allow_blank=True)
    address         = serializers.CharField(allow_blank=True)
    notes           = serializers.CharField(allow_blank=True)
    date_joined     = serializers.DateField(allow_null=True)
    num_semester    = serializers.IntegerField(required=False)
    position        = serializers.CharField(allow_blank=True)
    back_number     = serializers.IntegerField(required=False)

    class Meta:
        model = Member
        fields = [
            "admission_year", "student_id", "major", "phone", "email", "address",
            "birth_date", "notes", "role", "status", "date_joined", "num_semester",
            "hands", "position", "back_number", "is_elite"
        ]

    def validate_student_id(self, value):
        if value == None:
            return None
        if not is_valid_student_id(value):
            raise serializers.ValidationError("학번 형식이 올바르지 않습니다.")

        return value

    def validate_role(self, value):
        return get_role_choice(value)

    def validate_status(self, value):
        return get_status_choice(value)

    def validate_hands(self, value):
        return get_hands_choice(value)

    def validate_major(self, value):
        if value == None:
            return None

        major = Department.objects.get(id=value)

        return major
