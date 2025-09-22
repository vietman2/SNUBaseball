import pytest
from rest_framework.test import APIClient

from tests.factories import MemberFactory, UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def member():
    return MemberFactory(name="홍길동", admission_year=2025, student_id="2025-12345")


@pytest.fixture
def valid_student_id():
    return "2025-12345"


@pytest.fixture
def already_registered_student_id():
    return "2020-12345"


def test_id_check_success(api_client, member, valid_student_id):
    resp = api_client.post("/api/v1/register/sid/", {"student_id": valid_student_id})
    assert resp.status_code == 200
    assert resp.data["member_id"] == member.id
    assert resp.data["name"] == f"{member.name} ({member.admission_year})"


def test_id_check_nonexistent_student_id(api_client):
    resp = api_client.post("/api/v1/register/sid/", {"student_id": "9999-99999"})
    assert resp.status_code == 400
    assert resp.data["message"] == "학번이 존재하지 않습니다. 주장단에 문의해주세요."


def test_id_check_already_registered(api_client, already_registered_student_id):
    ## 2020-12345 학번을 먼저 가입시켜야 한다.
    new_member = MemberFactory(student_id=already_registered_student_id)
    UserFactory(member=new_member)

    resp = api_client.post(
        "/api/v1/register/sid/", {"student_id": already_registered_student_id}
    )
    assert resp.status_code == 400
    assert resp.data["message"] == "이미 가입된 학번입니다."


def test_id_check_empty_student_id(api_client):
    resp = api_client.post("/api/v1/register/sid/", {"student_id": ""})
    assert resp.status_code == 400
    assert resp.data["message"] == "학번을 입력해주세요."
