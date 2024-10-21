from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import PlayerTale

class PlayerTaleSerializer(ModelSerializer):
    weight = serializers.SerializerMethodField()
    height = serializers.SerializerMethodField()

    class Meta:
        model = PlayerTale
        fields = [
            "year", "weight", "height", "reason", "goal",
            "rival", "role_model", "strength", "weakness"
        ]

    def get_weight(self, obj):
        return f"{obj.weight}kg"

    def get_height(self, obj):
        return f"{obj.height}cm"
