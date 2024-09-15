import styled from "styled-components";

import { PersonType } from "@models/user/person";

interface Props {
  members: PersonType[];
}

export function MembersTable({ members }: Readonly<Props>) {
  const renderAddress = (address: string) => {
    if (address.length > 20) {
      return `${address.slice(0, 20)}...`;
    }
    return address;
  };

  return (
    <Table>
      <colgroup>
        <col style={{ width: "3vw" }} />
        <col style={{ width: "7vw" }} />
        <col style={{ width: "7vw" }} />
        <col style={{ width: "10vw" }} />
        <col style={{ width: "10vw" }} />
        <col style={{ width: "15vw" }} />
        <col style={{ width: "5vw" }} />
      </colgroup>
      <Header>
        <tr>
          <HeaderCell>No</HeaderCell>
          <HeaderCell>이름</HeaderCell>
          <HeaderCell>학번</HeaderCell>
          <HeaderCell>전화번호</HeaderCell>
          <HeaderCell>이메일</HeaderCell>
          <HeaderCell>주소</HeaderCell>
          <HeaderCell>가입여부</HeaderCell>
        </tr>
      </Header>
      <Body>
        {members.length > 0 && (
          <>
            {members.map((member, index) => (
              <tr key={member.id}>
                <BodyCell>{index + 1}</BodyCell>
                <BodyCell>{member.name}</BodyCell>
                <BodyCell>{member.admission_year}</BodyCell>
                <BodyCell>{member.phone}</BodyCell>
                <BodyCell>{member.email}</BodyCell>
                <BodyCell>{renderAddress(member.address)}</BodyCell>
                <BodyCell>{"X"}</BodyCell>
              </tr>
            ))}
          </>
        )}
      </Body>
    </Table>
  );
}

const Table = styled.table`
  flex: 1;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Header = styled.thead`
  background-color: #d2d2d2;
`;

const HeaderCell = styled.th`
  padding: 5px 10px;
  text-align: center;
`;

const Body = styled.tbody`
  align-items: center;
  justify-content: center;

  & tr:nth-child(even) {
    background-color: #f0f0f0;
  }
`;

const BodyCell = styled.td`
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;
