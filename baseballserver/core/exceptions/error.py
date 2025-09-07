from rest_framework.exceptions import APIException


class SNUBaseballException(APIException):
    status = "ERROR"
    code = "UNKNOWN_ERROR"
    default_detail = "서버에서 알 수 없는 오류가 발생했습니다."
    default_status_code = 400

    def __init__(self, detail=None, status=None, code=None, status_code=None):
        super().__init__(detail)
        self.detail = detail or self.default_detail
        self.status = status or self.status
        self.code = code or self.code
        self.status_code = status_code or self.default_status_code


class UnauthorizedException(SNUBaseballException):
    status = "UNAUTHORIZED"
    code = "UNAUTHORIZED"
    default_detail = "인증되지 않은 사용자입니다."
    default_status_code = 401


class InvalidRefreshTokenException(UnauthorizedException):
    status = "UNAUTHORIZED"
    code = "INVALID_REFRESH_TOKEN"
    default_detail = "리프레시 토큰이 유효하지 않습니다."
    default_status_code = 401


class ForbiddenException(SNUBaseballException):
    status = "FORBIDDEN"
    code = "FORBIDDEN"
    default_detail = "권한이 없는 사용자입니다."
    default_status_code = 403


class NotFoundException(SNUBaseballException):
    status = "NOT_FOUND"
    code = "NOT_FOUND"
    default_detail = "요청한 리소스를 찾을 수 없습니다."
    default_status_code = 404
