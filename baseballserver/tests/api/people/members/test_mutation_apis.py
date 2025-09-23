import pytest

from tests.factories import UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture(name="setup_data", scope="function")
def _setup_data():
    user = UserFactory.create_normal_account()
    admin = UserFactory.create_head_manager_account()

    return user, admin


@pytest.fixture(name="update_data", scope="function")
def _update_data():
    return {
        "major_id": 2,
        "phone": "010-1234-5678",
    }


@pytest.fixture(name="create_data", scope="function")
def _create_data():
    return {
        "name": "New Member",
        "admission_year": 2023,
        "student_id": "2023-12345",
        "birth_date": "2000-01-01",
        "major_id": 1,
        "phone": "01012341234",
        "email": "",
        "date_joined": "2023-03-01",
        "num_semester": 1,
    }


def test_members_update_own_profile(api_client, setup_data, update_data):
    user, _ = setup_data
    api_client.force_authenticate(user=user)
    resp = api_client.patch("/api/v1/members/1/", update_data)

    assert resp.status_code == 200


def test_members_update_invalid_field(api_client, setup_data):
    user, _ = setup_data
    api_client.force_authenticate(user=user)
    resp = api_client.patch("/api/v1/members/1/", {"birth_date": "12341234"})

    assert resp.status_code == 400
    assert resp.data["message"] == "잘못된 데이터입니다."


def test_members_create(api_client, setup_data, create_data):
    _, admin = setup_data
    api_client.force_authenticate(user=admin)
    resp = api_client.post("/api/v1/members/", create_data)

    assert resp.status_code == 201


def test_members_create_manager(api_client, setup_data, create_data):
    user, _ = setup_data
    data = create_data.copy()
    data["is_player"] = False
    api_client.force_authenticate(user=user)
    resp = api_client.post("/api/v1/members/", data)

    assert resp.status_code == 403


def test_members_create_with_student_id(api_client, setup_data, create_data):
    _, admin = setup_data
    api_client.force_authenticate(user=admin)
    data = create_data.copy()
    data["admission_year"] = None
    data["student_id"] = "2024-12345"
    resp = api_client.post("/api/v1/members/", data, format="json")

    assert resp.status_code == 201
    assert resp.data["admission_year"] == 2024


def test_members_create_invalid_admission_year(api_client, setup_data, create_data):
    _, admin = setup_data
    api_client.force_authenticate(user=admin)
    data = create_data.copy()
    data["admission_year"] = None
    data["student_id"] = "abcd-12345"
    resp = api_client.post("/api/v1/members/", data, format="json")

    assert resp.status_code == 400
    assert resp.data["message"] == "잘못된 데이터입니다."
