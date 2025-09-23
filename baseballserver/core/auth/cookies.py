from datetime import datetime
import jwt
from django.conf import settings


def set_refresh_cookie(response, refresh_token: str):
    alg = settings.SIMPLE_JWT["ALGORITHM"]
    payload = jwt.decode(
        refresh_token,
        settings.SIMPLE_JWT["SIGNING_KEY"],
        algorithms=[alg],
        options={"verify_aud": False},
    )
    expires_at = datetime.fromtimestamp(payload.get("exp"))

    is_dev_mode = settings.DEBUG
    secure = not is_dev_mode
    samesite = "Lax" if is_dev_mode else "None"

    response.set_cookie(
        "x_snubaseball_ref_tok",
        refresh_token,
        httponly=True,
        secure=secure,
        samesite=samesite,
        expires=expires_at,
    )

    return response


def delete_refresh_cookie(response):
    response.delete_cookie("x_snubaseball_ref_tok")
    return response
