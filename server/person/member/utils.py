from django.conf import settings

from core.storage import get_presigned_url

def get_role_chip(role):
    if role == 1:
        return {
            "name": "주장",
            "color": "#253238",
            "background_color": "#CFD8DC"
        }
    elif role == 2:
        return {
            "name": "부주장",
            "color": "#0D47A1",
            "background_color": "#BBDEFB"
        }
    elif role == 3:
        return {
            "name": "수석",
            "color": "#4A148C",
            "background_color": "#D1C4E9"
        }
    elif role == 4:
        return {
            "name": "매니저",
            "color": "#BF360C",
            "background_color": "#FFCCBC"
        }
    else:
        return {
            "name": "선수",
            "color": "#1B5E20",
            "background_color": "#C8E6C9"
        }

def get_status_chip(status):
    if status == 1:
        return {
            "name": "활동중",
            "color": "#01579B",
            "background_color": "#B3E5FC"
        }
    elif status == 2:
        return {
            "name": "비활동",
            "color": "#3E2723",
            "background_color": "#D7CCC8"
        }
    else:
        return {
            "name": "기타",
            "color": "#000000",
            "background_color": "#FFFFFF"
        }

def get_num_semester_text(num_semester, status):
    if status == 1:
        return f"{num_semester}학기+"

    return f"{num_semester}학기"

def get_profile_image_url(image):
    if image is None:
        return settings.FALLBACK_IMAGE

    image_file = image.image
    path = image_file.name[1:]

    return get_presigned_url(path)
