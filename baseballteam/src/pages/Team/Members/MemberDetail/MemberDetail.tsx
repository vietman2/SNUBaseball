import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { Divider } from "@components/Dividers";
import { ErrorComponent } from "@components/Fallbacks";
import { AppIcon } from "@components/Icons";
import { Menu } from "@components/Menus";
import { useTheme } from "@contexts/theme";
import { MenuOptionType } from "@models/app";
import { MemberType } from "@models/user";
import { getMemberDetail } from "@services/person";

export function MemberDetail() {
  const [member, setMember] = useState<MemberType>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const handleBack = () => {
    navigate(-1);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMemberDetail(Number(memberId));

      if (response) {
        setMember(response);
      }
    };

    fetchData();
  }, [memberId]);

  const handleEdit = () => {
    navigate(`/team/members/${memberId}/edit`);
  };

  const menu: MenuOptionType[] = [
    {
      label: "수정하기",
      onClick: handleEdit,
    },
  ];

  if (!member) {
    return <ErrorComponent label="뒤로가기" onRefresh={handleBack} />;
  }

  return (
    <Container>
      <Header>
        <div>
          <BackButton onClick={handleBack} data-testid="back">
            <AppIcon
              icon="chevron-left"
              size={24}
              color={colors.foreground900}
            />
          </BackButton>
          <img src={member.profile_image} alt="member" />
          <div>
            <Title>
              {member.name} ({member.admission_year})
              <Chip
                label={member.status.name}
                color={member.status.color}
                bgColor={member.status.background_color}
              />
            </Title>
            <span>
              <Chip
                label={member.role.name}
                color={member.role.color}
                bgColor={member.role.background_color}
              />
            </span>
          </div>
        </div>
        <Menu options={menu} isOpen={isMenuOpen} toggleDropdown={toggleMenu} />
      </Header>
      <span>
        <Divider bold color={colors.borderDark} />
      </span>
      <Contents>
        <Half>
          <Subtitle>부원 정보</Subtitle>
          <InfoRow>
            <span>학번</span>
            <span>{member.student_id}</span>
          </InfoRow>
          <Divider color={colors.borderDark} />
          <InfoRow>
            <span>전공</span>
            <span>{member.major}</span>
          </InfoRow>
          <Divider color={colors.borderDark} />
          <InfoRow>
            <span>전화번호</span>
            <span>{member.phone}</span>
          </InfoRow>
          <Divider color={colors.borderDark} />
          <InfoRow>
            <span>이메일</span>
            <span>{member.email}</span>
          </InfoRow>
          <Divider color={colors.borderDark} />
          <InfoRow>
            <span>생년월일</span>
            <span>{member.birth_date?.replace(/-/g, "/")}</span>
          </InfoRow>
          <Divider color={colors.borderDark} />
          <InfoRow>
            <span>주소</span>
            <span>{member.address}</span>
          </InfoRow>
        </Half>
        <span>
          <Divider bold color={colors.borderDark} />
        </span>
        <Half>
          <Subtitle>프로필</Subtitle>
          <InfoRow>
            <span>야구부 입부</span>
            <span>{member.date_joined}</span>
          </InfoRow>
          <Divider color={colors.borderDark} />
          <InfoRow>
            <span>활동기간</span>
            <span>{member.num_semester}</span>
          </InfoRow>
          <Divider color={colors.borderDark} />
          <InfoRow>
            <span>등번호</span>
            <span>{member.back_number}</span>
          </InfoRow>
          <Divider color={colors.borderDark} />
          <InfoRow>
            <span>주 포지션</span>
            <span>{member.position}</span>
          </InfoRow>
          <Divider color={colors.borderDark} />
          <InfoRow>
            <span>투타</span>
            <span>{member.hands}</span>
          </InfoRow>
          <Divider color={colors.borderDark} />
          <InfoRow>
            <span>비고</span>
            <span>{member.notes}</span>
          </InfoRow>
        </Half>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  margin-bottom: 24px;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;

    > img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-right: 12px;
      object-fit: cover;
      image-rendering: -webkit-optimize-contrast;
      transform: translateZ(0);
      backface-visibility: hidden;
    }

    > div {
      display: flex;
      flex-direction: column;
      gap: 4px;

      > span {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
      }
    }
  }

  > button {
    display: flex;
    padding: 0 8px;
  }
`;

const BackButton = styled.button`
  display: flex;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.4rem;
  font-weight: bold;
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Half = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 8px;
  gap: 12px;
`;

const Subtitle = styled.span`
  padding: 0 8px 8px 8px;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground900};
}`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;

  color: ${({ theme }) => theme.colors.foreground700};
  font-size: 1rem;

  > span:first-child {
    width: 80px;
  }

  > span:last-child {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: flex-end;
    font-weight: 600;
    text-align: right;
  }
`;
