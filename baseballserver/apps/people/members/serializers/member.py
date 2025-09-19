from rest_framework import serializers

from ..models import Department, Member
from .major import DepartmentSerializer


class MemberDetailsSerializer(serializers.ModelSerializer):
    birth_date = serializers.DateField(
        format="%Y-%m-%d", input_formats=["%Y-%m-%d"], allow_null=True
    )
    date_joined = serializers.DateField(
        format="%Y-%m-%d", input_formats=["%Y-%m-%d"], allow_null=True
    )
    profile_image = serializers.CharField(source="profile_image.url", read_only=True)
    major = DepartmentSerializer(read_only=True)

    major_id = serializers.PrimaryKeyRelatedField(
        source="major",
        queryset=Department.objects.all(),
        write_only=True,
        required=False,
    )
    phone = serializers.CharField(allow_blank=True, allow_null=True, required=False)
    email = serializers.EmailField(allow_blank=True, allow_null=True, required=False)

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
            "birth_date",
            "date_joined",
            "major_id",
        ]
        read_only_fields = [
            "id",
            "name",
            "admission_year",
        ]

    def validate(self, attrs):
        ## 빈 문자열로 오는 phone, email을 None으로 바꿔줌
        for f in ("phone", "email"):
            if f in attrs and attrs[f] == "":
                attrs[f] = None
        return attrs
