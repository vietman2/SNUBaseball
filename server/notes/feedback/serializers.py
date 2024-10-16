from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Feedback, FeedbackCategory

class FeedbackCategorySerializer(ModelSerializer):
    class Meta:
        model = FeedbackCategory
        fields = ['label', 'color', 'background_color']

class FeedbackSimpleSerializer(ModelSerializer):
    category    = FeedbackCategorySerializer()
    content     = serializers.SerializerMethodField()
    player      = serializers.SerializerMethodField()
    author      = serializers.SerializerMethodField()
    status      = serializers.CharField(source='get_status_display')
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")
    updated_at  = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Feedback
        fields = [
            'id', 'title', 'content', 'player', 'author',
            'category', 'status', 'created_at', 'updated_at'
        ]

    def get_content(self, obj):
        return obj.content[:50]

    def get_player(self, obj):
        return obj.player.member.full_name

    def get_author(self, obj):
        return obj.author.member.full_name
