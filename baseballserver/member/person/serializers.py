from rest_framework import serializers

from media.image.serializers import ThumbnailSerializer
from media.image.utils import get_image_url
from member.major.models import Department
from member.major.serializers import DepartmentSerializer
from .models import Member


class ProfileSerializer(serializers.ModelSerializer):
    major_id = serializers.PrimaryKeyRelatedField(
        source="major",
        queryset=Department.objects.all(),
        write_only=True,
        required=False,
    )
    phone = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    email = serializers.EmailField(allow_blank=True, allow_null=True, required=False)

    major = DepartmentSerializer(read_only=True)
    profile_image = ThumbnailSerializer(read_only=True)

    class Meta:
        model = Member
        fields = [
            "id",
            "name",
            "student_id",
            "admission_year",
            "major",
            "profile_image",
            "phone",
            "email",
            "address",
            "major_id",
        ]
        read_only_fields = [
            "id",
            "name",
            "student_id",
            "admission_year",
        ]

    def validate(self, attrs):
        for f in ("phone", "email"):
            if f in attrs and attrs[f] == "":
                attrs[f] = None
        return attrs


class MemberSimpleSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    birth_date = serializers.DateField(
        format="%Y-%m-%d", input_formats=["%Y-%m-%d"], allow_null=True
    )
    date_joined = serializers.DateField(
        format="%Y-%m-%d", input_formats=["%Y-%m-%d"], allow_null=True
    )

    major = serializers.CharField(source="major.name", read_only=True)
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = Member
        read_only_fields = [
            "type",
            "id",
            "name",
            "admission_year",
        ]
        fields = [
            "type",
            "id",
            "name",
            "back_number",
            "birth_date",
            "date_joined",
            "num_semester",
            "admission_year",
            "major",
            "profile_image",
            "extras",
        ]

    def get_type(self, obj):
        ## Role이 1, 2, 5면 PLAYER
        ## Role이 3, 4면 MANAGER
        ## Role이 6, 7, 8이면 STAFF
        ## 나머지는 OTHER
        if obj.role_id in [1, 2, 5]:
            return "PLAYER"
        elif obj.role_id in [3, 4]:
            return "MANAGER"
        elif obj.role_id in [6, 7, 8]:
            return "STAFF"

        return "OTHER"

    def get_profile_image(self, obj):
        if obj.profile_image:
            return get_image_url(obj.profile_image.key)
        return None
