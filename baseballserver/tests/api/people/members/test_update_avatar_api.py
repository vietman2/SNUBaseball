import pytest
from rest_framework.test import APIClient

from apps.media.assets.api import SNUBaseballImage
from tests.factories import UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture(autouse=True)
def media_cdn(settings):
    # asset.url property가 사용할 값
    settings.MEDIA_CDN_BASE_URL = "https://cdn.test/"


def _patch_media_services(monkeypatch, member_id):
    """
    MembersViewSet이 import한 심볼을 'views' 네임스페이스에서 패치해야 함.
    """
    key = f"profiles/{member_id}/avatar.png"

    # presign: prefix 검사 + 정형 응답
    def fake_presign_upload(*, prefix, filename, content_type=None, size=0):
        assert prefix == f"profiles/{member_id}/"
        return {
            "key": key,
            "post": {"url": "https://s3.test/presigned", "fields": {"key": key}},
        }

    # complete: 실제 DB에 이미지 레코드 생성해서 반환
    def fake_complete_upload(*, key, original_filename=None, uploaded_by=None):
        return SNUBaseballImage.objects.create(
            key=key,
            original_filename=original_filename or "",
            mime="image/png",
            size=1024,
            uploaded_by=uploaded_by,
        )

    monkeypatch.setattr(
        "apps.people.members.views.members.presign_upload", fake_presign_upload
    )
    monkeypatch.setattr(
        "apps.people.members.views.members.complete_upload", fake_complete_upload
    )
    return key


def test_members_update_avatar_success(api_client, monkeypatch):
    # 본인(member)로 로그인
    user = UserFactory.create_normal_account()
    member_id = user.member.id
    api_client.force_authenticate(user=user)

    # services 패치
    expected_key = _patch_media_services(monkeypatch, member_id)

    # 1) presign 요청
    presign_resp = api_client.post(
        f"/api/v1/members/{member_id}/avatar/presign/",
        {
            "filename": "avatar.png",
            "content_type": "image/png",
            "size": 1024,
        },
        format="json",
    )
    assert presign_resp.status_code == 200
    presign_data = presign_resp.json()
    assert presign_data["key"] == expected_key
    assert "url" in presign_data["post"]
    assert presign_data["post"]["fields"]["key"] == expected_key

    # 2) complete 요청
    complete_resp = api_client.patch(
        f"/api/v1/members/{member_id}/avatar/complete/",
        {
            "key": expected_key,
            "original_filename": "avatar.png",
        },
        format="json",
    )
    assert complete_resp.status_code == 200
    # 응답에 url 포함(모델 property 사용)
    data = complete_resp.json()
    assert "url" in data and data["url"].startswith("https://cdn.test/")

    # 멤버의 profile_image가 실제로 설정되었는지 확인
    user.member.refresh_from_db()
    assert user.member.profile_image is not None
    assert user.member.profile_image.key == expected_key
