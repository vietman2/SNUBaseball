import pytest
from django.core.management import call_command
from rest_framework.test import APIClient

PORTAL_CLIENT_HEADER = {"HTTP_X_SNUBASEBALL_CLIENT": "snu-baseball-team-portal"}


def pytest_configure(config):
    config.addinivalue_line(
        "markers",
        "no_portal_header: disable automatic portal header injection for this test",
    )


@pytest.fixture(scope="session", autouse=True)
def refdata(request, django_db_blocker):
    request.getfixturevalue("django_db_setup")

    with django_db_blocker.unblock():
        call_command("loaddata", "majors.json")
        call_command("loaddata", "roles.json")
        call_command("loaddata", "status.json")


@pytest.fixture(name="client")
def _client():
    return APIClient()


@pytest.fixture()
def api_client(client):
    return client


@pytest.fixture(autouse=True)
def _inject_portal_header(request, client):
    if request.node.get_closest_marker("no_portal_header"):
        return

    client.defaults.update(PORTAL_CLIENT_HEADER)


@pytest.fixture(autouse=True)
def s3_client(mocker):
    client = mocker.Mock()
    client.head_object.return_value = {
        "ContentLength": 1234,
        "ContentType": "image/png",
        "ETag": '"etag-1234"',
    }
    client.generate_presigned_post.return_value = {
        "url": "https://s3.test/presigned",
        "fields": {"key": "k"},
    }
    client.put_object.return_value = {"ResponseMetadata": {"HTTPStatusCode": 200}}
    mocker.patch(
        "apps.media.storage.services.verify_head.get_client", return_value=client
    )
    mocker.patch(
        "apps.media.storage.services.presign_post.get_client", return_value=client
    )
    mocker.patch(
        "apps.media.storage.services.upload_file.get_client", return_value=client
    )
    return client
