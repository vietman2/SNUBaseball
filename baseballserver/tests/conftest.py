import pytest
from django.core.management import call_command
from rest_framework.test import APIClient


@pytest.fixture(scope="session", autouse=True)
def refdata(request, django_db_blocker):
    request.getfixturevalue("django_db_setup")

    with django_db_blocker.unblock():
        call_command("loaddata", "majors.json")
        call_command("loaddata", "roles.json")
        call_command("loaddata", "status.json")


@pytest.fixture(autouse=True)
def api_client():
    return APIClient()
