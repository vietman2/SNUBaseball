import factory
from factory.django import DjangoModelFactory
from django.contrib.auth import get_user_model

from .members import MemberFactory

User = get_user_model()


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        skip_postgeneration_save = True

    username = factory.Sequence(lambda n: f"user{n:05d}")
    member = factory.SubFactory(MemberFactory)

    @factory.post_generation
    def password(self, create, extracted, **kwargs):
        raw = extracted or "defaultpassword123!"
        self.set_password(raw)
        if create:
            self.save()

    ## ----- 메소드 ----- ##
    @classmethod
    def create_admin(cls, **kwargs):
        """
        관리자 권한을 가진 유저 생성
        """
        return cls.create(is_superuser=True, **kwargs)

    @classmethod
    def create_normal_account(cls, **kwargs):
        """
        일반 부원 권한을 가진 유저 생성
        """
        member = MemberFactory.create_normal()
        return cls.create(member=member, **kwargs)

    @classmethod
    def create_captain_account(cls, **kwargs):
        """
        주장 권한을 가진 유저 생성
        """
        member = MemberFactory.create_captain()
        return cls.create(member=member, **kwargs)

    @classmethod
    def create_head_manager_account(cls, **kwargs):
        """
        수석매니저 권한을 가진 유저 생성
        """
        member = MemberFactory.create_head_manager()
        return cls.create(member=member, **kwargs)

    @classmethod
    def create_manager_account(cls, **kwargs):
        """
        매니저 권한을 가진 유저 생성
        """
        member = MemberFactory.create_manager()
        return cls.create(member=member, **kwargs)

    @classmethod
    def create_military_account(cls, **kwargs):
        """
        군필자 권한을 가진 유저 생성
        """
        member = MemberFactory.create_military()
        return cls.create(member=member, **kwargs)

    @classmethod
    def create_graduated_account(cls, **kwargs):
        """
        졸업자 권한을 가진 유저 생성
        """
        member = MemberFactory.create_graduated()
        return cls.create(member=member, **kwargs)

    @classmethod
    def create_professor_account(cls, **kwargs):
        """
        지도교수 권한을 가진 유저 생성
        """
        member = MemberFactory.create_professor()
        return cls.create(member=member, **kwargs)

    @classmethod
    def create_head_coach_account(cls, **kwargs):
        """
        감독 권한을 가진 유저 생성
        """
        member = MemberFactory.create_head_coach()
        return cls.create(member=member, **kwargs)
