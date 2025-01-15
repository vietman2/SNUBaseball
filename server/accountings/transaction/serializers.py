from datetime import timedelta
from django.db import transaction as db_transaction
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from accountings.account.models import Account
from accountings.account.serializers import AccountSerializer
from .models import Transaction
from .utils import get_category, get_method, get_type, update_balance

class TransactionSerializer(ModelSerializer):
    account             = AccountSerializer(read_only=True)
    account_id          = serializers.IntegerField(write_only=True)
    date                = serializers.DateField(format='%Y-%m-%d')
    type                = serializers.CharField()
    category            = serializers.CharField()
    method              = serializers.CharField()
    balance_after       = serializers.IntegerField(read_only=True)

    class Meta:
        model = Transaction
        fields = [
            'id', 'account', 'account_id', 'amount', 'description', 'type', 'category',
            'method', 'counter_party', 'balance_after', 'date', 'notes'
        ]

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['type'] = instance.get_type_display()
        ret['category'] = instance.get_category_display()
        ret['method'] = instance.get_method_display()
        return ret

    def validate_category(self, value):
        return get_category(value)

    def validate_method(self, value):
        return get_method(value)

    def validate_type(self, value):
        return get_type(value)

    def create(self, validated_data):
        account_id = validated_data.pop('account_id')
        account = Account.objects.get(id=account_id)

        with db_transaction.atomic():
            day_after = validated_data.get('date') + timedelta(days=1)
            transactions = Transaction.objects.filter(
                account=account, date__lt=day_after
            ).order_by('-date', '-id')
            transaction_before = transactions[0] if len(transactions) > 1 else None

            transaction = Transaction.objects.create(
                account=account,
                balance_after=0,
                **validated_data
            )

            difference = transaction.amount if transaction.type == "수입" else -transaction.amount
            update_balance(transaction, difference)

            if transaction_before:
                transaction.balance_after = transaction_before.balance_after + difference
            else:
                transaction.balance_after = account.cached_balance + difference

            transaction.save()

            return transaction

    def update(self, instance, validated_data):
        new_amount = validated_data['amount']
        new_type = validated_data['type']

        with db_transaction.atomic():
            old_amount = instance.amount if instance.type == "수입" else -instance.amount
            new_amount = new_amount if new_type == "수입" else -new_amount

            transaction = super().update(instance, validated_data)

            if old_amount != new_amount:
                difference = new_amount - old_amount
                update_balance(instance, difference)
                transaction.balance_after += difference

            transaction.save()

            return transaction
