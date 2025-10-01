import types
import pytest
from rest_framework.test import APIRequestFactory

from apps.media.gallery.views.media import GalleryMediaAPIView
from core.error_handling import SNUBaseballException
from tests.factories import GalleryFactory, UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture(autouse=True)
def setup():
    GalleryFactory.create_public_album(title="public album")
    GalleryFactory.create_private_album(title="private album")


@pytest.fixture(name="users")
def _users():
    normal_user = UserFactory.create_normal_account()
    admin_user = UserFactory.create_admin()

    return normal_user, admin_user


MEDIA_API_URL = "/api/v1/gallery/media/"


def test_media_list_default(api_client):
    resp = api_client.get(MEDIA_API_URL)
    assert resp.status_code == 200
    assert "results" in resp.data
    assert isinstance(resp.data["results"], list)
    assert len(resp.data["results"]) == 5


def test_media_list_with_album_filter(api_client):
    resp = api_client.get(f"{MEDIA_API_URL}?album=public album")
    assert resp.status_code == 200
    assert "results" in resp.data
    assert isinstance(resp.data["results"], list)
    assert len(resp.data["results"]) == 5
    for item in resp.data["results"]:
        assert item["album"] == "public album"


def test_media_list_with_tag_filter(api_client):
    resp = api_client.get(f"{MEDIA_API_URL}?tags=1")
    assert resp.status_code == 200
    assert "results" in resp.data
    assert isinstance(resp.data["results"], list)
    assert len(resp.data["results"]) == 4

    ## 여러 태그 필터링
    resp2 = api_client.get(f"{MEDIA_API_URL}?tags=1&tags=2")
    assert resp2.status_code == 200
    assert "results" in resp2.data
    assert isinstance(resp2.data["results"], list)
    assert len(resp2.data["results"]) == 5


def test_media_list_full_access(api_client, users):
    ## 로그인하여, 모든 미디어 접근 가능
    normal_user, _ = users
    api_client.force_authenticate(user=normal_user)

    resp = api_client.get(MEDIA_API_URL)
    assert resp.status_code == 200
    assert "results" in resp.data
    assert isinstance(resp.data["results"], list)
    assert len(resp.data["results"]) == 6


def test_media_invalid_tag_query(api_client):
    resp = api_client.get(f"{MEDIA_API_URL}?tags=abc")
    assert resp.status_code == 400
    assert "잘못된 태그 쿼리입니다." in resp.data["message"]


def test_media_invalid_object(api_client):
    ## COVERAGE PURPOSE ONLY
    ## 실제로는 발생하면 안됨.
    view = GalleryMediaAPIView()
    view.request = APIRequestFactory().get("/dummy")
    mock_obj = types.SimpleNamespace()
    with pytest.raises(SNUBaseballException) as e:
        view._serialize_batch(objs=[mock_obj])

    assert str(e.value) == "알 수 없는 미디어 객체입니다."
