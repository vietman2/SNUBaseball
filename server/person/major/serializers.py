from rest_framework.serializers import ModelSerializer

from .models import College, Department

class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = ["id", "name", "short_name"]

class CollegeSerializer(ModelSerializer):
    departments = DepartmentSerializer(many=True, read_only=True, source='department_set')

    class Meta:
        model = College
        fields = ['id', 'name', 'short_name', 'departments']
