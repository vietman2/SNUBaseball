import styled from "styled-components";

import { Chip } from "@components/Chips";
import { MemberType } from "@models/user";

export function MembersRowHeader() {
  return (
    <Header>
      <div>No.</div>
      <div>학번</div>
      <div>이름</div>
      <div>전화번호</div>
      <div>상태</div>
      <div>활동기간</div>
      <div>구분</div>
    </Header>
  );
}

interface Props {
  member: MemberType;
  index: number;
}

export function MemberTableRow({ index, member }: Readonly<Props>) {
  return (
    <Container>
      <div>{index + 1}</div>
      <div>{member.admission_year}</div>
      <div>{member.name}</div>
      <div>{member.phone}</div>
      <div>
        <Chip
          label={member.status.name}
          color={member.status.color}
          bgColor={member.status.background_color}
          size="small"
        />
      </div>
      <div>{member.num_semester}</div>
      <div>
        <Chip
          label={member.role.name}
          color={member.role.color}
          bgColor={member.role.background_color}
          size="small"
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 36px;
  max-height: 36px;

  border-top: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    min-height: 36px;
    max-height: 36px;
    font-size: 1rem;
    border-right: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
  }

  > div:first-child {
    width: 60px;
  }

  > div:nth-child(4) {
    width: 160px;
  }

  > div:nth-child(6) {
    width: 80px;
  }

  > div:last-child {
    width: 80px;
    border-right: none;
  }
`;

const Header = styled(Container)`
  font-weight: bold;
  border-top: none;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
`;
