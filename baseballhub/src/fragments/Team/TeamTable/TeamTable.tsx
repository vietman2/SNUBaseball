import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { sampleMembers } from "@data/user/people";
import { useWindowSize } from "@hooks/useWindowSize";
import { MemberType } from "@models/user";

export function TeamTable() {
  const [members, setMembers] = useState<MemberType[]>([]);

  const { width } = useWindowSize();

  useEffect(() => {
    setMembers(sampleMembers);
  }, []);

  return (
    <Table>
      <Header>
        <SmallHeader></SmallHeader>
        <LargeHeader>
          <div>이름</div>
        </LargeHeader>
        {width > 768 && (
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
      {members.map((member) => (
        <Row key={member.id}>
          <SmallCell>
            <RoleChip role={member.role} />
          </SmallCell>
          <NameCell>
            <img src={member.profile_image} alt={member.name} />
            <div>
              <div>
                {member.name}
                <span>
                  {member.back_number ? `(${member.back_number})` : ""}
                </span>
              </div>
              <div>{`${member.position} ${member.hands}`}</div>
            </div>
          </NameCell>
          {width > 768 && (
            <>
              <MediumCell>
                <div>{member.student_id}</div>
                <div>{member.department}</div>
              </MediumCell>
              <ContactCell>
                <div>{member.phone}</div>
                <div>{member.email}</div>
              </ContactCell>
              <MediumCell>
                <div>입부: {member.joined_at}</div>
                <div>기간: {member.num_semesters}</div>
              </MediumCell>
            </>
          )}
          <SmallCell>
            <span>
              <StatusChip status={member.status} />
            </span>
          </SmallCell>
        </Row>
      ))}
    </Table>
  );
}

interface RoleProps {
  role: string;
}

function RoleChip({ role }: Readonly<RoleProps>) {
  if (role === "주장") {
    return <Chip label={role} color="#263238" bgColor="#CFD8DC" />;
  } else if (role === "부주장") {
    return <Chip label={role} color="#0D47A1" bgColor="#BBDEFB" />;
  } else if (role === "수석") {
    return <Chip label={role} color="#4A148C" bgColor="#D1C4E9" />;
  } else if (role === "매니저") {
    return <Chip label={role} color="#BF360C" bgColor="#FFCCBC" />;
  } else {
    return <Chip label={role} color="#1B5E20" bgColor="#C8E6C9" />;
  }
}

interface StatusProps {
  status: string;
}

function StatusChip({ status }: Readonly<StatusProps>) {
  if (status === "활동중") {
    return <Chip label={status} color="#01579B" bgColor="#B3E5FC" />;
  } else {
    return <Chip label={status} color="#3E2723" bgColor="#D7CCC8" />;
  }
}

const Table = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

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

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 16px 8px;

  color: ${({ theme }) => theme.colors.foreground900};

  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
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
