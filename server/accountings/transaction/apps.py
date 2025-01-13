from django.apps import AppConfig

class TransactionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accountings.transaction'
    label = 'transaction'
