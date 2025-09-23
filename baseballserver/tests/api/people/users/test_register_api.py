import pytest

from tests.factories import MemberFactory


pytestmark = pytest.mark.django_db


@pytest.fixture(name="member")
def _member():
    # 테스트마다 독립 멤버
    return MemberFactory.create_normal()


@pytest.fixture(name="data")
def _data(member):
    return {
        "username": "testuser",
        "password": "Test@1234",
        "password2": "Test@1234",
        "member": member.id,
        "student_id": member.student_id,
    }


def test_register(api_client, data):
    response = api_client.post("/api/v1/register/", data, format="json")
    assert response.status_code == 201
    assert response.data["message"] == "회원가입이 완료되었습니다."


def test_register_password_mismatch(api_client, data):
    bad_data = {**data, "password2": "Different@1234"}
    response = api_client.post("/api/v1/register/", bad_data, format="json")
    assert response.status_code == 400
    assert response.data["message"] == "비밀번호가 일치하지 않습니다."


def test_register_member_already_registered(api_client, data):
    # First registration should succeed
    response1 = api_client.post("/api/v1/register/", data, format="json")
    assert response1.status_code == 201

    # Second registration with the same member should fail
    response2 = api_client.post("/api/v1/register/", data, format="json")
    assert response2.status_code == 400
    assert response2.data["message"] == "이미 가입된 회원입니다."


def test_register_student_id_mismatch(api_client, data):
    bad_data = {**data, "student_id": "2025-54321"}
    response = api_client.post("/api/v1/register/", bad_data, format="json")
    assert response.status_code == 400
    assert response.data["message"] == "학번이 일치하지 않습니다."


def test_register_invalid_data(api_client, data):
    bad_data = {**data, "username": ""}
    response = api_client.post("/api/v1/register/", bad_data, format="json")
    assert response.status_code == 400
    assert "아이디를 입력해주세요." in response.data["message"]
