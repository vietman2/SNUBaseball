from django.db.models import F, Value, CharField, IntegerField

from .models import GalleryImage, GalleryVideo


def album_media_union_queryset(album):
    """
    앨범의 이미지와 비디오를 통합하여 생성일 기준으로 정렬된 쿼리셋을 반환
    """
    images_qs = (
        album.images.select_related("image")
        .annotate(
            media_type=Value("image", output_field=CharField()),
            media_id=F("pk"),
            media_created_at=F("image__file__created_at"),
            type_order=Value(0, output_field=IntegerField()),  # 이미지 우선
        )
        .values("media_type", "media_id", "media_created_at", "type_order")
    )

    videos_qs = (
        album.videos.select_related("video")
        .annotate(
            media_type=Value("video", output_field=CharField()),
            media_id=F("pk"),
            media_created_at=F("video__file__created_at"),
            type_order=Value(1, output_field=IntegerField()),
        )
        .values("media_type", "media_id", "media_created_at", "type_order")
    )

    return images_qs.union(videos_qs, all=True).order_by(
        "-media_created_at", "-type_order", "-media_id"
    )


def fetch_media_page_objects(page_rows):
    """
    페이지네이션된 미디어 행들에 해당하는 실제 객체들을 조회하여 반환
    """
    image_ids = [r["media_id"] for r in page_rows if r["media_type"] == "image"]
    video_ids = [r["media_id"] for r in page_rows if r["media_type"] == "video"]

    image_map = {
        obj.id: obj
        for obj in GalleryImage.objects.filter(id__in=image_ids)
        .select_related("image")
        .prefetch_related("tags")
    }
    video_map = {
        obj.id: obj
        for obj in GalleryVideo.objects.filter(id__in=video_ids)
        .select_related("video")
        .prefetch_related("tags")
    }

    page_objs = []
    for row in page_rows:
        if row["media_type"] == "image":
            obj = image_map.get(row["media_id"])
            page_objs.append(obj)
        else:
            obj = video_map.get(row["media_id"])
            page_objs.append(obj)

    return page_objs
