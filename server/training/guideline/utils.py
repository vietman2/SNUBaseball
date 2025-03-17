import re
import requests
import instaloader
from django.core.files.base import ContentFile
from rest_framework.exceptions import ValidationError
from urllib.parse import urlparse, parse_qs

def get_type_chip(is_drill):
    if is_drill:
        return {
            "label": "드릴",
            "color": "#455A64",
            "background_color": "#ECEFF1"
        }
    else:
        return {
            "label": "예시",
            "color": "#6A1B9A",
            "background_color": "#F3E5F5"
        }

def get_location_chip(is_indoor):
    if is_indoor:
        return {
            "label": "실내 가능",
            "color": "#0000FF",
            "background_color": "#D6E5FF"
        }
    else:
        return {
            "label": "실내 불가",
            "color": "#FF0000",
            "background_color": "#FFD6D6"
        }

def parse_media_url(url: str) -> dict:
    parsed = urlparse(url)
    host = parsed.netloc.lower()
    path = parsed.path

    ## --- Check for YouTube URL ---
    if "youtube.com" in host:
        if path == "/watch":
            qs = parse_qs(parsed.query)
            video_id = qs.get("v", [None])[0]
            if video_id:
                return {"is_youtube": True, "video_id": video_id}
        # Case 2: YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
        shorts_match = re.match(r"^/shorts/([A-Za-z0-9_-]{11})", path)
        if shorts_match:
            video_id = shorts_match.group(1)
            return {"is_youtube": True, "video_id": video_id}

    # Case 3: youtu.be shortened URL: https://youtu.be/VIDEO_ID
    if "youtu.be" in host:
        # The path should be /VIDEO_ID
        video_id = path.lstrip("/")
        # Optionally, you can validate the video_id length (YouTube IDs are 11 characters)
        if video_id and len(video_id) == 11:
            return {"is_youtube": True, "video_id": video_id}

    # --- Instagram URL handling ---
    # Check for typical Instagram post/reel URLs, e.g., /p/ or /reel/
    if "instagram.com" in host:
        pattern = r"instagram\.com/(?:p|reel|tv)/([^/?#&]+)"
        match = re.search(pattern, url)

        if match:
            shortcode = match.group(1)
            info = get_instagram_info(shortcode)

            return {
                "is_youtube": False,
                "video_id": shortcode,
                "video_url": info["video_url"],
                "thumbnail": info["thumbnail"]
            }

        raise ValidationError("Invalid Instagram URL format.")

    # If URL does not match any of the above, raise an exception.
    raise ValidationError("Unsupported URL format.")

def get_instagram_info(shortcode: str) -> dict:
    L = instaloader.Instaloader()
    post = instaloader.Post.from_shortcode(L.context, shortcode)

    headers = {'User-Agent': 'Mozilla/5.0'}
    r = requests.get(post.url, headers=headers, stream=True)

    if r.status_code != 200:
        raise ValidationError("Failed to fetch Instagram post.")

    filename = f"{shortcode}.jpg"
    return {
        "video_url": post.video_url if post.is_video else None,
        "thumbnail": ContentFile(r.content, name=filename)
    }
