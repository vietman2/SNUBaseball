from rest_framework import serializers

from media.image.serializers import ThumbnailSerializer
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
