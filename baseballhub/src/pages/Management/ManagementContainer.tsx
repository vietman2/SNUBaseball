import { useState } from "react";
import styled from "styled-components";

import { Equipment } from "./Equipment/Equipment";
import { Team } from "./Team/Team";
import { MobileHeader, PageHeader } from "@components/Headers";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["Team", "메디컬", "장비 현황"];

export default function ManagementContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("Team");

  const { width } = useWindowSize();

  const renderContent = () => {
    switch (selectedTab) {
      case "Team":
        return <Team />;
      case "메디컬":
        return <div>메디컬화면</div>;
      case "장비 현황":
        return <Equipment />;
      default:
        return <div>경기결과화면</div>;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader
          title="매니지먼트"
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      ) : (
        <MobileHeader
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      )}
      <Content>{renderContent()}</Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  margin: 8px;
`;
