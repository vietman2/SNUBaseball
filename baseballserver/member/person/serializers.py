from rest_framework import serializers

from .models import Member
from media.image.serializers import ThumbnailSerializer
from member.major.models import Department
from member.major.serializers import DepartmentSerializer


class ProfileSerializer(serializers.ModelSerializer):
    major_id = serializers.PrimaryKeyRelatedField(
        source="major",
        queryset=Department.objects.all(),
        write_only=True,
        required=False,
    )
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
