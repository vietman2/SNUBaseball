from django.conf import settings
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from core.storage import get_presigned_url
from person.tale.serializers import PlayerTaleSerializer
from .models import Member

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
        if obj.role == 1:
            return {
                "name": "주장",
                "color": "#253238",
                "background_color": "#CFD8DC"
            }
        elif obj.role == 2:
            return {
                "name": "부주장",
                "color": "#0D47A1",
                "background_color": "#BBDEFB"
            }
        elif obj.role == 3:
            return {
                "name": "수석",
                "color": "#4A148C",
                "background_color": "#D1C4E9"
            }
        elif obj.role == 4:
            return {
                "name": "매니저",
                "color": "#BF360C",
                "background_color": "#FFCCBC"
            }
        else:
            return {
                "name": "선수",
                "color": "#1B5E20",
                "background_color": "#C8E6C9"
            }

    def get_profile_image(self, obj):
        if obj.profile_image is None:
            return settings.FALLBACK_IMAGE

        image_file = obj.profile_image.image
        path = image_file.name[1:]

        return get_presigned_url(path)

    def get_num_semester(self, obj):
        if obj.status == 1:
            return f"{obj.num_semester}학기+"

        return f"{obj.num_semester}학기"

    def get_status(self, obj):
        if obj.status == 1:
            return {
                "name": "활동중",
                "color": "#01579B",
                "background_color": "#B3E5FC"
            }
        elif obj.status == 2:
            return {
                "name": "비활동",
                "color": "#3E2723",
                "background_color": "#D7CCC8"
            }
        else:
            return {
                "name": "기타",
                "color": "#000000",
                "background_color": "#FFFFFF"
            }

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
        if obj.profile_image is None:
            return settings.FALLBACK_IMAGE

        image_file = obj.profile_image.image
        path = image_file.name[1:]

        return get_presigned_url(path)

    def get_major(self, obj):
        if obj.major is None:
            return None

        return obj.major.name

    def get_phone(self, obj):
        return obj.phone.as_national

    def get_num_semester(self, obj):
        if obj.status == 1:
            return f"{obj.num_semester}학기+"

        return f"{obj.num_semester}학기"

    def get_status(self, obj):
        if obj.status == 1:
            return {
                "name": "활동중",
                "color": "#01579B",
                "background_color": "#B3E5FC"
            }
        elif obj.status == 2:
            return {
                "name": "비활동",
                "color": "#3E2723",
                "background_color": "#D7CCC8"
            }
        else:
            return {
                "name": "기타",
                "color": "#000000",
                "background_color": "#FFFFFF"
            }

    def get_tale(self, obj):
        ## get the latest tale (in year)
        tale = obj.tales.order_by('-year').first()

        if tale is None:
            return None

        return PlayerTaleSerializer(tale).data
