from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from person.user.utils import is_admin
from .enums import LocationChoices
from .models import Equipment, EquipmentCategory, EquipmentUpdateHistory

class EquipmentSerializer(ModelSerializer):
    quantity    = serializers.SerializerMethodField()

    class Meta:
        model = Equipment
        fields = ['id', 'name', 'quantity']

    def get_quantity(self, obj):
        return f"{obj.quantity}{obj.unit}"

class EquipmentHistorySerializer(ModelSerializer):
    person      = serializers.CharField(source='person.full_name')
    updated_at  = serializers.DateTimeField(format='%m-%d')

    class Meta:
        model = EquipmentUpdateHistory
        fields = ['id', 'summary', 'details', 'updated_at', 'person', 'notes']

class EquipmentCategorySerializer(ModelSerializer):
    person_in_charge    = serializers.SerializerMethodField()
    location            = serializers.SerializerMethodField()
    updated_at          = serializers.SerializerMethodField()
    history             = EquipmentHistorySerializer(many=True, source='equipment_update_history')
    is_in_charge        = serializers.SerializerMethodField()

    class Meta:
        model = EquipmentCategory
        fields = [
            'id', 'name', 'person_in_charge', 'location',
            'updated_at', 'management_tips', 'history', 'is_in_charge'
        ]

    def get_person_in_charge(self, obj):
        ## return member's names in list
        pic_set = set(obj.person_in_charge.all())
        return [pic.full_name for pic in pic_set]

    def get_location(self, obj):
        ## return equipment by location
        locations = obj.equipment_set.values('location').distinct()
        location_query = self.context.get('location', None)
        if location_query:
            locations = locations.filter(location=location_query)

        for location in locations:
            location['equipment'] = EquipmentSerializer(
                obj.equipment_set.filter(location=location['location']),
                many=True
            ).data
            location['name'] = LocationChoices(location['location']).label
            del location['location']

        return locations

    def get_updated_at(self, obj):
        updated_at = obj.equipment_update_history.latest('updated_at').updated_at
        return updated_at.strftime('%Y-%m-%d')

    def get_is_in_charge(self, obj):
        user = self.context.get('user', None)
        if not user:
            return False

        if is_admin(user):
            return True

        return user.member in obj.person_in_charge.all()