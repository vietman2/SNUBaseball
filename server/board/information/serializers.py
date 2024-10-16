from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Information

class InformationSimpleSerializer(ModelSerializer):
    author      = serializers.SerializerMethodField()
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Information
        fields = ['id', 'title', 'author', 'created_at', 'num_views', 'pin']

    def get_author(self, obj):
        return obj.author.member.full_name
