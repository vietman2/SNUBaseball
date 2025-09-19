from django.contrib import admin

## Models to unregister
from django.contrib.auth.models import Group
from rest_framework_simplejwt.token_blacklist.models import (
    OutstandingToken,
    BlacklistedToken,
)

unnecessary_models = [
    Group,
    OutstandingToken,
    BlacklistedToken,
]

for model in unnecessary_models:
    admin.site.unregister(model)
