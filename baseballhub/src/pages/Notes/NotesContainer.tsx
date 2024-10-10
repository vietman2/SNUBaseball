import { useState } from "react";
import styled from "styled-components";

import { VerticalDivider } from "@components/Dividers";
import { MobileHeader, PageHeader } from "@components/Headers";
import { Tabs } from "@components/Tabs";
import { Title } from "@components/Texts";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["훈련 일지", "피드백", "전력분석"];

export default function NotesContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("훈련 일지");

  const { width } = useWindowSize();

  const renderContent = () => {
    switch (selectedTab) {
      case "훈련 일지":
        return <div>훈련 일지화면</div>;
      case "피드백":
        return <div>피드백화면</div>;
      case "전력분석":
        return <div>전력분석화면</div>;
      default:
        return <div>경기결과</div>;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader>
          <Title>Notes</Title>
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
