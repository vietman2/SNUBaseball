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
