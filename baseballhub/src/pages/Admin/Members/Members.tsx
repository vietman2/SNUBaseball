import { useEffect, useState } from "react";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { MembersTable } from "@components/Tables";
import { Tabs } from "@components/Tabs";
import { PersonType } from "@models/user/person";
import { getMembers } from "@services/person";

const tabs = ["YB", "OB", "지도자", "기타"];

export function Members() {
  const [selectedTab, setSelectedTab] = useState<string>("YB");
  const [members, setMembers] = useState<PersonType[]>([]);

  const fetchMembers = async () => {
    const data = await getMembers(selectedTab);

    if (data) {
      setMembers(data);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [selectedTab]);

  return (
    <>
      <Container>
        <Title>부원관리</Title>
        <Tabs
          tabs={tabs}
          activeTab={selectedTab}
          setActiveTab={setSelectedTab}
        />
        <Content>
          <Horizontal>
            <Chip label="신입부원 추가" onClick={() => {}} />
          </Horizontal>
          <MembersTable members={members} />
        </Content>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;

const Content = styled.div`
  flex: 1;
  background-color: white;
  padding: 1rem 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;
