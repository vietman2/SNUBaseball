import types

from apps.media.gallery.permissions import IsOpsOrUploader


def test_missing_image_and_video_denied(mocker):
    mocker.patch(
        "apps.media.gallery.permissions.IsOps.has_permission", return_value=False
    )

    perm = IsOpsOrUploader()
    req = types.SimpleNamespace(user=None)
    obj = types.SimpleNamespace()  # image/video 없음
    assert perm.has_object_permission(req, view=None, obj=obj) is False
