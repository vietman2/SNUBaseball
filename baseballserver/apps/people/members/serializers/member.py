from rest_framework import serializers

from ..models import Department, Member, MemberRole, MemberStatus
from .major import DepartmentSerializer


class MemberDetailsSerializer(serializers.ModelSerializer):
    admission_year = serializers.IntegerField(
        min_value=1900, max_value=2100, allow_null=True, required=False
    )
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

    role = serializers.CharField(source="role.name", read_only=True)
    status = serializers.CharField(source="status.label", read_only=True)
    is_player = serializers.BooleanField(write_only=True, required=False)

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
            "role",
            "status",
            "is_player",
        ]
        read_only_fields = [
            "id",
        ]

    def validate(self, attrs):
        ## 빈 문자열로 오는 phone, email을 None으로 바꿔줌
        for f in ("phone", "email"):
            if f in attrs and attrs[f] == "":
                attrs[f] = None

        ## student_id만 들어오고, admission_year = null이 들어오면, student_id에서 추출해서 저장한다
        if "student_id" in attrs and "admission_year" in attrs:
            if attrs["admission_year"] is None:
                try:
                    attrs["admission_year"] = int(attrs["student_id"][:4])
                except (ValueError, TypeError) as e:
                    raise serializers.ValidationError(
                        {  # type: ignore
                            "admission_year": "학번으로부터 입학 연도를 추출할 수 없습니다. 올바른 학번인지 확인해주세요.",
                        }
                    ) from e

        return attrs

    ## 수정할 때는, name와 student_id는 수정 불가
    def update(self, instance, validated_data):
        validated_data.pop("name", None)
        validated_data.pop("student_id", None)

        return super().update(instance, validated_data)

    def create(self, validated_data):
        data = validated_data.copy()

        default_role = MemberRole.objects.get(name="선수")
        default_status = MemberStatus.objects.get(label="활동중")

        is_player = data.pop("is_player", True)
        if is_player:
            data["role"] = default_role
        else:
            data["role"] = MemberRole.objects.get(name="매니저")

        member = Member.objects.create(**data, status=default_status)

        return member
