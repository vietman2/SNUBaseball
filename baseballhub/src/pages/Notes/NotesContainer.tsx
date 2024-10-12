import { useState } from "react";
import styled from "styled-components";

import { Feedback } from "./Feedback/Feedback";
import { MobileHeader, PageHeader } from "@components/Headers";
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
        return <Feedback />;
      case "전력분석":
        return <div>전력분석화면</div>;
      default:
        return <div>경기결과</div>;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader
          title="Notes"
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
