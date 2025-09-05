from rest_framework import serializers

from media.image.serializers import ThumbnailSerializer
from member.major.serializers import DepartmentSerializer
from .models import Member


class ProfileSerializer(serializers.ModelSerializer):
    major = DepartmentSerializer()
    profile_image = ThumbnailSerializer()

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
        ]
        read_only_fields = [
            "id",
            "name",
            "student_id",
            "admission_year",
            "major",
            "profile_image",
        ]
