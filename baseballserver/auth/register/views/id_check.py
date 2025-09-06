from django.core.exceptions import ObjectDoesNotExist
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from auth.user.models import User
from core.exceptions import SNUBaseballException
from member.person.models import Member


class StudentIdCheckView(GenericAPIView):
    """
    학번 확인 API (회원가입이 가능한 학번인지 확인하는 API)
        - Member object가 존재하면서 User object가 없는 경우에만 가입이 가능하다
        - 학번이 존재하지 않는 경우에는 ValidationError를 발생시킨다
        - 이미 가입된 학번인 경우에도 ValidationError를 발생시킨다
    """

    permission_classes = [AllowAny]
    http_method_names = ["post"]

    @extend_schema(summary="학번 확인", tags=["회원 관리"])
    def post(self, request, *args, **kwargs):  ## pylint: disable=unused-argument
        student_id = request.data.get("student_id", "").strip()
        if not student_id or student_id == "":
            raise SNUBaseballException("학번을 입력해주세요.")

        ## Member object가 있으면서, User object가 없는 경우만 가입이 가능하다
        ## 즉, Member object가 있으면서 User object가 있는 경우는 이미 가입한 경우이고
        ## Member object가 없는 경우는 가입이 불가능한 경우이다

        try:
            member = Member.objects.get(student_id=student_id)
        except ObjectDoesNotExist as e:
            raise SNUBaseballException(
                "학번이 존재하지 않습니다. 주장단에 문의해주세요."
            ) from e

        if User.objects.filter(member=member).exists():
            raise SNUBaseballException("이미 가입된 학번입니다.")

        data = {
            "member_id": member.id,
            "name": f"{member.name} ({member.admission_year})",
        }

        return Response(data, status=status.HTTP_200_OK)
