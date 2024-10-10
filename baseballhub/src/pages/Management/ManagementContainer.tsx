import { useState } from "react";
import styled from "styled-components";

import { VerticalDivider } from "@components/Dividers";
import { MobileHeader, PageHeader } from "@components/Headers";
import { Tabs } from "@components/Tabs";
import { Title } from "@components/Texts";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["Team", "메디컬", "장비 현황", "활동보고", "회의록"];

export default function ManagementContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("Team");

  const { width } = useWindowSize();

  const renderContent = () => {
    switch (selectedTab) {
      case "Team":
        return <div>Team화면</div>;
      case "메디컬":
        return <div>메디컬화면</div>;
      case "장비 현황":
        return <div>장비 현황화면</div>;
      case "활동보고":
        return <div>활동보고화면</div>;
      case "회의록":
        return <div>회의록화면</div>;
      default:
        return <div>경기결과화면</div>;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader>
          <Title>매니지먼트</Title>
          <VerticalDivider height="45%" bold />
          <Tabs
            tabs={tabs}
            activeTab={selectedTab}
            setActiveTab={setSelectedTab}
          />
        </PageHeader>
      ) : (
        <MobileHeader>
          <Tabs
            tabs={tabs}
            activeTab={selectedTab}
            setActiveTab={setSelectedTab}
            textSize="small"
          />
        </MobileHeader>
      )}
      <Content>{renderContent()}</Content>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  margin: 8px;
`;
