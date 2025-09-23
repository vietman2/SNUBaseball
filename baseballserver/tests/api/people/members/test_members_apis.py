import pytest


from tests.factories import UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture(name="setup_data", scope="function")
def _setup_data():
    user = UserFactory.create_normal_account()
    admin = UserFactory.create_head_manager_account()

    return user, admin


@pytest.fixture(name="request_data", scope="function")
def _request_data():
    return {
        "major_id": 2,
        "phone": "010-1234-5678",
    }


def test_members_update_own_profile(api_client, setup_data, request_data):
    user, _ = setup_data
    api_client.force_authenticate(user=user)
    resp = api_client.patch("/api/v1/members/1/", request_data)

    assert resp.status_code == 200
