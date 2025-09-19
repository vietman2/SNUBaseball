import pytest
from django.core.management import call_command


@pytest.fixture(scope="session", autouse=True)
def refdata(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        call_command("loaddata", "majors.json")
        call_command("loaddata", "roles.json")
        call_command("loaddata", "status.json")
