import styled from "styled-components";

import { Chip } from "@components/Chips";
import { MemberType } from "@models/user";

interface HeaderProps {
  wide: boolean;
}

export function MemberSimpleHeader({ wide }: Readonly<HeaderProps>) {
  return (
    <Header>
      <SmallHeader></SmallHeader>
      <LargeHeader>
        <div>이름</div>
      </LargeHeader>
      {wide && (
        <>
          <MediumHeader>
            <div>학적</div>
          </MediumHeader>
          <LargeHeader>
            <div>연락처</div>
          </LargeHeader>
          <MediumHeader>
            <div>활동</div>
          </MediumHeader>
        </>
      )}
      <SmallHeader>상태</SmallHeader>
    </Header>
  );
}

interface Props {
  member: MemberType;
  wide: boolean;
}

export function MemberSimple({ member, wide }: Readonly<Props>) {
  return (
    <PlayerContainer>
      <SmallCell>
        <Chip
          label={member.role.name}
          color={member.role.color}
          bgColor={member.role.background_color}
        />
      </SmallCell>
      <NameCell>
        <img src={member.profile_image} alt={member.name} />
        <div>
          <div>
            {member.name}
            <span>{member.back_number ? `(${member.back_number})` : ""}</span>
          </div>
          <div>{`${member.position} ${member.hands}`}</div>
        </div>
      </NameCell>
      {wide && (
        <>
          <MediumCell>
            <div>{member.student_id}</div>
            <div>{member.major}</div>
          </MediumCell>
          <ContactCell>
            <div>{member.phone}</div>
            <div>{member.email}</div>
          </ContactCell>
          <MediumCell>
            <div>입부: {member.date_joined}</div>
            <div>기간: {member.num_semester}</div>
          </MediumCell>
        </>
      )}
      <SmallCell>
        <span>
          <Chip
            label={member.status.name}
            color={member.status.color}
            bgColor={member.status.background_color}
          />
        </span>
      </SmallCell>
    </PlayerContainer>
  );
}

const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 8px;

  color: ${({ theme }) => theme.colors.foreground900};
  font-weight: 600;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background900};
`;

const SmallHeader = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const MediumHeader = styled.div`
  display: flex;
  flex: 2;

  div {
    display: flex;
    padding: 0 24px;
  }
`;

const LargeHeader = styled.div`
  display: flex;
  flex: 3;

  div {
    display: flex;
    padding: 0 60px;
  }
`;

const PlayerContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 8px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.foreground900};

  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};

  > div {
    display: flex;
    align-items: flex-start;
  }
`;

const NameCell = styled.div`
  display: flex;
  flex: 3;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;

    object-fit: cover;
    image-rendering: -webkit-optimize-contrast;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;

    > div:nth-child(1) {
      color: ${({ theme }) => theme.colors.foreground900};
      font-size: 18px;
      font-weight: 600;

      span {
        margin-left: 4px;
        font-size: 14px;
        font-weight: 400;
      }
    }

    > div:nth-child(2) {
      font-size: 14px;
      color: ${({ theme }) => theme.colors.borderDark};
    }
  }
`;

const SmallCell = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  span {
    display: flex;
  }
`;

const MediumCell = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: 8px;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground300};
`;

const ContactCell = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  gap: 8px;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground300};
`;
