import factory
from factory.django import DjangoModelFactory

from apps.people.members.models import Member, MemberRole, MemberStatus, Department


## ----- 내부 헬퍼 ----- ##
def _role(name: str) -> MemberRole:
    return MemberRole.objects.get(name=name)


def _status(name: str) -> MemberStatus:
    return MemberStatus.objects.get(name=name)


def _default_major() -> Department:
    return Department.objects.get(pk=1)


class MemberFactory(DjangoModelFactory):
    """
    Roles, Status는 fixture에 있는 실제 값들을 사용
    """

    class Meta:
        model = Member

    student_id = factory.Sequence(lambda n: f"2025-{n:05d}")
    name = factory.Faker("name")
    admission_year = 2025
    major = factory.LazyFunction(_default_major)
    role = factory.LazyFunction(lambda: _role("선수"))
    status = factory.LazyFunction(lambda: _status("ACTIVE"))

    ## ----- 메소드 ----- ##
    @classmethod
    def create_normal(cls, **kwargs) -> Member:
        """
        기본적인 부원 생성
        """
        return cls.create(**kwargs)

    @classmethod
    def create_captain(cls, **kwargs) -> Member:
        """
        주장 생성
        """
        return cls.create(role=_role("주장"), **kwargs)
    
    @classmethod
    def create_vice_captain(cls, **kwargs) -> Member:
        """
        부주장 생성
        """
        return cls.create(role=_role("부주장"), **kwargs)

    @classmethod
    def create_head_manager(cls, **kwargs) -> Member:
        """
        매니저 생성
        """
        return cls.create(role=_role("수석매니저"), **kwargs)

    @classmethod
    def create_manager(cls, **kwargs) -> Member:
        """
        매니저 생성
        """
        return cls.create(role=_role("매니저"), **kwargs)

    @classmethod
    def create_military(cls, **kwargs) -> Member:
        """
        군휴학 부원 생성
        """
        return cls.create(status=_status("MILITARY"), **kwargs)

    @classmethod
    def create_graduated(cls, **kwargs) -> Member:
        """
        졸업 부원 생성
        """
        return cls.create(status=_status("GRADUATED"), **kwargs)

    @classmethod
    def create_professor(cls, **kwargs) -> Member:
        """
        지도교수 생성
        """
        return cls.create(role=_role("지도교수"), **kwargs)

    @classmethod
    def create_head_coach(cls, **kwargs) -> Member:
        """
        감독 생성
        """
        return cls.create(role=_role("감독"), **kwargs)
