import { useEffect, useState } from "react";
import styled from "styled-components";

import { ViewButtons } from "@components/Buttons";
import { MembersRowHeader, MemberTableRow } from "@fragments/Member";
import { MemberType } from "@models/user";
import { getMembers } from "@services/person";

const views = [
  {
    label: "전체",
    icon: "list",
  },
  {
    label: "YB",
    icon: "baseball",
  },
  {
    label: "OB",
    icon: "graduate",
  },
  {
    label: "기타",
    icon: "dots",
  },
];

export function MembersList() {
  const [view, setView] = useState<string>("전체");
  const [members, setMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMembers(view);

      if (response) {
        setMembers(response);
      }
    };

    fetchData();
  }, [view]);

  return (
    <Container>
      <Header>
        <ViewButtons buttons={views} selected={view} onClick={setView} wide />
      </Header>
      <List>
        <MembersRowHeader />
        <>
          {members.length === 0 ? (
            <div>데이터가 없습니다.</div>
          ) : (
            <>
              {members.map((member, index) => (
                <MemberTableRow key={member.id} index={index} member={member} />
              ))}
            </>
          )}
        </>
      </List>
    </Container>
  );
}

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Vertical)`
  padding: 16px 0;
`;

const Header = styled(Vertical)`
  padding: 8px;
`;

const List = styled(Vertical)``;
