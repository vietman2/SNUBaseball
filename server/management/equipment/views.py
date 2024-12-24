from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from person.member.models import Member
from .enums import LocationChoices
from .models import Equipment, EquipmentCategory, EquipmentUpdateHistory
from .serializers import EquipmentCategorySerializer
from .utils import get_location

class EquipmentCategoryView(ModelViewSet):
    queryset = EquipmentCategory.objects.all()
    serializer_class = EquipmentCategorySerializer
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get', 'patch']

    @extend_schema(summary="장비 카테고리 조회", tags=["장비 관리"])
    def list(self, request, *args, **kwargs):
        location = request.query_params.get('location', None)
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        if location == "전체":
            return Response(serializer.data, status=status.HTTP_200_OK)

        location_query = get_location(location)
        serializer.context['location'] = location_query

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="장비 카테고리 상세 조회", tags=["장비 관리"])
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        serializer.context['user'] = request.user
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="장비 수량 업데이트", tags=["장비 관리"])
    @action(detail=True, methods=['patch'])
    def quantity(self, request, *args, **kwargs):
        instance = self.get_object()
        equipment_id = request.data.get('equipment_id', None)
        quantity = request.data.get('quantity', None)
        notes = request.data.get('notes', None)
        if quantity is None or equipment_id is None or notes is None:
            return Response({"message": "잘못된 요청입니다."}, status=status.HTTP_400_BAD_REQUEST)

        equipment = Equipment.objects.get(id=equipment_id)
        location = LocationChoices(equipment.location).label
        original = equipment.quantity
        equipment.quantity = quantity
        equipment.save()

        EquipmentUpdateHistory.objects.create(
            category=instance,
            person=request.user.member,
            summary='수량 업데이트',
            details=f'[{location}] {equipment.name} ({original}{equipment.unit} -> {quantity}{equipment.unit})',
            notes=notes
        )

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="장비 담당자 변경", tags=["장비 관리"])
    @action(detail=True, methods=['patch'])
    def managers(self, request, *args, **kwargs):
        instance = self.get_object()
        manager_ids = request.data.get('manager_ids', None)
        if manager_ids is None:
            return Response({"message": "잘못된 요청입니다."}, status=status.HTTP_400_BAD_REQUEST)

        original = instance.person_in_charge.all()
        original_text = ', '.join([manager.full_name for manager in original])
        instance.person_in_charge.clear()
        new = []
        for manager_id in manager_ids:
            member = Member.objects.get(id=manager_id)
            new.append(member)
        instance.person_in_charge.set(new)
        instance.save()

        new_text = ', '.join([manager.full_name for manager in new])

        EquipmentUpdateHistory.objects.create(
            category=instance,
            person=request.user.member,
            summary='담당자 변경',
            details=f'{original_text} -> {new_text}',
            notes=""
        )

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="신규 물품 추가", tags=["장비 관리"])
    @action(detail=True, methods=['patch'])
    def new(self, request, *args, **kwargs):
        instance = self.get_object()
        location = request.data.get('location', None)
        name = request.data.get('name', None)
        quantity = request.data.get('quantity', None)
        unit = request.data.get('unit', None)
        notes = request.data.get('notes', None)
        if name is None or quantity is None or location is None or unit is None or notes is None:
            return Response({"message": "잘못된 요청입니다."}, status=status.HTTP_400_BAD_REQUEST)

        location = get_location(location)

        Equipment.objects.create(
            category=instance,
            name=name,
            quantity=quantity,
            unit=unit,
            location=location
        )

        EquipmentUpdateHistory.objects.create(
            category=instance,
            person=request.user.member,
            summary='신규 물품 추가',
            details=f'[{LocationChoices(location).label}] {name} ({quantity}{unit})',
            notes=notes
        )

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def partial_update(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)