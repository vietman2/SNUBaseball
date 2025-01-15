from .enums import TransactionCategory, TransactionMethod, TransactionType
from .models import Transaction

def get_category(input):
    if input == "식비":
        return TransactionCategory.FOOD
    elif input == "교통비":
        return TransactionCategory.TRANSPORTATION
    elif input == "숙박비":
        return TransactionCategory.ACCOMMODATION
    elif input == "야구용품비":
        return TransactionCategory.SUPPLIES
    elif input == "선수등록비":
        return TransactionCategory.REGISTRATION
    else:
        return TransactionCategory.OTHER

def get_method(input):
    if input == "카드":
        return TransactionMethod.CARD
    elif input == "계좌이체":
        return TransactionMethod.TRANSFER
    else:
        return TransactionMethod.OTHER

def get_type(input):
    if input == "수입":
        return TransactionType.INCOME
    else:
        return TransactionType.OUTCOME

def update_balance(transaction, difference):
    account = transaction.account
    account.cached_balance += difference
    account.save()

    transactions_after = Transaction.objects.filter(
        account=account, date__gt=transaction.date
    ).order_by("date")

    for t in transactions_after:
        t.balance_after += difference
        t.save()
