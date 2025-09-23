import pytest

from tests.factories import MemberFactory, UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture(name="setup")
def _setup():
    MemberFactory.create_batch(5)
    user = UserFactory.create_admin()

    return user


def test_members_list(api_client, setup):
    user = setup
    api_client.force_authenticate(user=user)
    resp = api_client.get("/api/v1/members/")

    assert resp.status_code == 200
    assert isinstance(resp.json(), list)
    assert len(resp.json()) > 0


def test_members_retrieve(api_client, setup):
    user = setup
    api_client.force_authenticate(user=user)
    resp = api_client.get("/api/v1/members/1/")

    assert resp.status_code == 200
    assert isinstance(resp.json(), dict)
    assert resp.json().get("id") == 1
