from rest_framework import serializers

from ..models import Member


class MemberPublicSerializer(serializers.ModelSerializer):
    birth_date = serializers.DateField(format="%Y-%m-%d", read_only=True)
    profile_image = serializers.ImageField(source="profile_image.url", read_only=True)
    major = serializers.CharField(source="major.name", read_only=True)

    class Meta:
        model = Member
        fields = [
            "id",
            "name",
            "admission_year",
            "birth_date",
            "profile_image",
            "major",
        ]
        read_only_fields = fields
