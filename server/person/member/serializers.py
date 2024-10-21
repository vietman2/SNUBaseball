from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from person.tale.serializers import PlayerTaleSerializer
from .models import Member
from .utils import get_role_chip, get_status_chip, get_num_semester_text, get_profile_image_url

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
    tale            = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = [
            "id", "role", "name", "position", "hands", "student_id", "profile_image", "major",
            "phone", "email", "date_joined", "num_semester", "status", "back_number", "tale"
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

    def get_tale(self, obj):
        ## get the latest tale (in year)
        tale = obj.tales.order_by('-year').first()

        if tale is None:
            return None

        return PlayerTaleSerializer(tale).data
