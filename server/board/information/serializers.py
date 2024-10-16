from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from person.user.serializers import AuthorSerializer
from .models import Information, InformationContentView

class InformationSimpleSerializer(ModelSerializer):
    author      = serializers.SerializerMethodField()
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Information
        fields = ['id', 'title', 'author', 'created_at', 'num_views', 'pin']

class InformationDetailSerializer(ModelSerializer):
    author      = AuthorSerializer()
    created_at  = serializers.DateTimeField(format="%Y-%m-%d")

    class Meta:
        model = Information
        fields = ['id', 'title', 'content', 'author', 'created_at', 'num_views', 'pin']

    def get_author(self, obj):
        return obj.author.member.full_name

    def increment_num_views(self):
        self.instance.num_views += 1
        self.instance.save()

        return self.instance

    def content_viewed(self, user):
        content_view, _ = InformationContentView.objects.get_or_create(
            user=user,
            information=self.instance
        )

        content_view.viewed_last_at = content_view.viewed_last_at.now()
        content_view.save()

        return content_view
