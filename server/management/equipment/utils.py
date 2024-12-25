from .enums import LocationChoices

def get_location(text):
    if text == "아카데미":
        return LocationChoices.ACADEMY_STORAGE
    if text == "창고":
        return LocationChoices.OUTER_STORAGE
    if text == "부실":
        return LocationChoices.LOCKER

    return LocationChoices.OTHER