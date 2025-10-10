import pytest

from tests.factories import SNUBaseballImageFactory, UserFactory

pytestmark = pytest.mark.django_db


@pytest.fixture(autouse=True)
def media_cdn(settings):
    # asset.url property가 사용할 값
    settings.MEDIA_CDN_BASE_URL = "https://cdn.test/"


def _patch_media_services(monkeypatch, member_id):
    """
    MembersViewSet이 import한 심볼을 'views' 네임스페이스에서 패치해야 함.
    """
    key = f"profiles/{member_id}/avatar.png"

    def fake_presign_upload(
        *, key, content_type=None, size=0
    ):  # pylint: disable=unused-argument
        return {
            "url": f"https://s3.test/presigned/{key}",
            "fields": {"key": key},
        }

    def fake_complete_upload(
        *, key, expected_prefix, original_filename=None, uploaded_by=None
    ): ## pylint: disable=unused-argument
        assert key.startswith(expected_prefix)
        return SNUBaseballImageFactory(
            file__key=key,
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
    assert presign_data["url"] == f"https://s3.test/presigned/{expected_key}"
    assert presign_data["fields"]["key"] == expected_key

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


def test_members_update_avatar_presign_invalid_data(api_client):
    # 본인(member)로 로그인
    user = UserFactory.create_normal_account()
    member_id = user.member.id
    api_client.force_authenticate(user=user)

    # presign 요청: filename 누락
    resp = api_client.post(
        f"/api/v1/members/{member_id}/avatar/presign/",
        {
            "content_type": "image/png",
            "size": 1024,
        },
        format="json",
    )
    assert resp.status_code == 400
    assert resp.data["message"] == "유효하지 않은 데이터입니다."


def test_members_update_avatar_complete_invalid_data(api_client):
    # 본인(member)로 로그인
    user = UserFactory.create_normal_account()
    member_id = user.member.id
    api_client.force_authenticate(user=user)

    # complete 요청: key 누락
    resp = api_client.patch(
        f"/api/v1/members/{member_id}/avatar/complete/",
        {
            "original_filename": "avatar.png",
        },
        format="json",
    )
    assert resp.status_code == 400
    assert resp.data["message"] == "유효하지 않은 데이터입니다."


def test_members_update_avatar_complete_invalid_key(api_client):
    # 본인(member)로 로그인
    user = UserFactory.create_normal_account()
    member_id = user.member.id
    api_client.force_authenticate(user=user)

    # complete 요청: key가 다른 멤버의 prefix로 시작함
    resp = api_client.patch(
        f"/api/v1/members/{member_id}/avatar/complete/",
        {
            "key": f"invalid/{member_id + 1}/avatar.png",  # 잘못된 key
            "original_filename": "avatar.png",
        },
        format="json",
    )
    assert resp.status_code == 400
    assert resp.data["message"] == "유효하지 않은 키입니다."


def test_members_update_avatar_complete_not_image(api_client, monkeypatch):
    # 본인(member)로 로그인
    user = UserFactory.create_normal_account()
    member_id = user.member.id
    api_client.force_authenticate(user=user)

    # services 패치 (complete_upload가 이미지를 반환하지 않도록)
    def fake_complete_upload(
        *, key, expected_prefix, original_filename=None, uploaded_by=None
    ):  ## pylint: disable=unused-argument
        class NotAnImage:
            url = "https://cdn.test/not-an-image.png"

        return NotAnImage()

    monkeypatch.setattr(
        "apps.people.members.views.members.complete_upload", fake_complete_upload
    )

    # complete 요청
    resp = api_client.patch(
        f"/api/v1/members/{member_id}/avatar/complete/",
        {
            "key": f"profiles/{member_id}/avatar.png",
            "original_filename": "avatar.png",
        },
        format="json",
    )
    assert resp.status_code == 400
    assert resp.data["message"] == "이미지 파일만 업로드할 수 있습니다."
