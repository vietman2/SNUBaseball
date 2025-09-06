from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import College, Department


class DepartmentSerializer(ModelSerializer):
    college = serializers.CharField(source="college.name", read_only=True)
    college_id = serializers.IntegerField(source="college.id", read_only=True)

    class Meta:
        model = Department
        fields = ["id", "name", "short_name", "college", "college_id"]


class CollegeSerializer(ModelSerializer):
    departments = DepartmentSerializer(
        many=True, read_only=True, source="department_set"
    )

    class Meta:
        model = College
        fields = ["id", "name", "short_name", "departments"]
