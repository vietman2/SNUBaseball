from datetime import datetime, timedelta, timezone
import jwt
from django.http import HttpResponse

from core.auth import set_refresh_cookie, delete_refresh_cookie


def _make_refresh_token(
    signing_key: str, alg: str = "HS256", exp_seconds: int = 3600
) -> str:
    exp = datetime.now(timezone.utc) + timedelta(seconds=exp_seconds)
    payload = {"exp": int(exp.timestamp()), "typ": "refresh"}
    return jwt.encode(payload, signing_key, algorithm=alg)


def test_set_refresh_cookie_in_dev_mode_sets_lax_and_not_secure(settings):
    settings.DEBUG = True  # dev
    token = _make_refresh_token(settings.SIMPLE_JWT["SIGNING_KEY"])

    resp = HttpResponse()
    set_refresh_cookie(resp, token)

    assert "x_snubaseball_ref_tok" in resp.cookies
    morsel = resp.cookies["x_snubaseball_ref_tok"]

    # 값/속성 확인(문자열 헤더로 검사하면 버전에 덜 민감)
    line = morsel.output(
        header=""
    ).strip()  # " x_snubaseball_ref_tok=...; Path=/; HttpOnly; SameSite=Lax"
    assert token in line
    assert "HttpOnly" in line
    assert "SameSite=Lax" in line
    assert "Secure" not in line  # dev 모드에선 secure=False

    # 만료(expires) 헤더 존재
    assert "expires=" in line or "Expires=" in line


def test_set_refresh_cookie_in_prod_mode_sets_none_and_secure(settings):
    settings.DEBUG = False  # prod
    token = _make_refresh_token(settings.SIMPLE_JWT["SIGNING_KEY"])

    resp = HttpResponse()
    set_refresh_cookie(resp, token)

    morsel = resp.cookies["x_snubaseball_ref_tok"]
    line = morsel.output(header="").strip()

    assert "HttpOnly" in line
    assert "Secure" in line  # prod 모드에선 secure=True
    assert "SameSite=None" in line


def test_delete_refresh_cookie_marks_expired(settings):
    settings.DEBUG = False
    token = _make_refresh_token(settings.SIMPLE_JWT["SIGNING_KEY"])

    resp = HttpResponse()
    set_refresh_cookie(resp, token)

    # 삭제 호출
    delete_refresh_cookie(resp)

    # Django는 delete_cookie로 같은 이름의 쿠키를 빈 값 + 만료/Max-Age=0 로 세팅
    assert "x_snubaseball_ref_tok" in resp.cookies
    morsel = resp.cookies["x_snubaseball_ref_tok"]
    line = morsel.output(header="").strip()

    # 값은 비워지고, 만료 표시가 있어야 함
    assert "x_snubaseball_ref_tok=" in line  # value는 빈 문자열로 재설정
    assert ("Max-Age=0" in line) or ("expires=" in line) or ("Expires=" in line)
