def get_error_message(e):
    if "phone_number" in e.detail:
        codes = e.get_codes()["phone_number"]

        if "invalid" in codes:
            return "전화번호가 올바른 형식이 아닙니다."
        if "unique" in codes:
            return "이미 사용 중인 전화번호입니다."

    return "오류가 발생했습니다."
