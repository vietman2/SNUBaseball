from django.conf import settings

from core.storage import get_presigned_url
from .enums import StatusType, RoleType, HandsType

def get_role_chip(role):
    if role == 1:
        return {
            "name": "주장",
            "color": "#0D47A1",
            "background_color": "#BBDEFB"
        }
    elif role == 2:
        return {
            "name": "부주장",
            "color": "#0D47A1",
            "background_color": "#BBDEFB"
        }
    elif role == 3:
        return {
            "name": "수석매니저",
            "color": "#0D47A1",
            "background_color": "#BBDEFB"
        }
    elif role == 4:
        return {
            "name": "매니저",
            "color": "#253238",
            "background_color": "#CFD8DC"
        }
    elif role == 6:
        return {
            "name": "지도자",
            "color": "#4A148C",
            "background_color": "#D1C4E9"
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
            "color": "#3D6B31",
            "background_color": "#E7F0DF"
        }
    elif status == 2:
        return {
            "name": "비활동",
            "color": "#E53935",
            "background_color": "#FEE4E2"
        }
    elif status == 3:
        return {
            "name": "군입대",
            "color": "#D2691E",
            "background_color": "#FFE4C4"
        }
    elif status == 4:
        return {
            "name": "OB",
            "color": "#4E342E",
            "background_color": "#D7CCC8"
        }
    else:
        return {
            "name": "기타",
            "color": "#455A64",
            "background_color": "#ECEFF1"
        }

def get_num_semester_text(num_semester, status):
    if status == 1:
        return f"{num_semester}학기+"

    return f"{num_semester}학기"

def get_profile_image_url(image):
    if image is None or image.name == "":
        return settings.FALLBACK_IMAGE

    return get_presigned_url(image.name)

def is_valid_student_id(student_id):
    if len(student_id) != 10 or student_id[4] != '-':
        return False
    if not student_id[:4].isdigit() or not student_id[5:].isdigit():
        return False

    return True

def get_status_choice(value):
    if value == "활동중":
        return StatusType.ACTIVE
    elif value == "비활동":
        return StatusType.INACTIVE
    elif value == "군입대":
        return StatusType.MILITARY
    elif value == "OB":
        return StatusType.GRADUATED
    elif value == "기타":
        return StatusType.OTHER

    return StatusType.UNDEFINED

def get_role_choice(value):
    if value == "주장":
        return RoleType.CAPTAIN
    elif value == "부주장":
        return RoleType.VICE_CAPTAIN
    elif value == "수석매니저":
        return RoleType.HEAD_MANAGER
    elif value == "매니저":
        return RoleType.MANAGER
    elif value == "선수":
        return RoleType.PLAYER
    elif value == "지도자":
        return RoleType.MENTOR
    elif value == "기타":
        return RoleType.OTHER

    return RoleType.UNDEFINED

def get_hands_choice(value):
    if value == "우투우타":
        return HandsType.RR
    elif value == "우투좌타":
        return HandsType.RL
    elif value == "좌투우타":
        return HandsType.LR
    elif value == "좌투좌타":
        return HandsType.LL
    elif value == "양투우타":
        return HandsType.BR
    elif value == "양투좌타":
        return HandsType.BL
    elif value == "우투양타":
        return HandsType.RB
    elif value == "좌투양타":
        return HandsType.LB
    elif value == "양투양타":
        return HandsType.BB

    return HandsType.UNDEFINED
