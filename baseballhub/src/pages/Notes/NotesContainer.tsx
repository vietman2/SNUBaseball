import { useState } from "react";
import styled from "styled-components";

import { Analysis } from "./Analysis/Analysis";
import { Feedback } from "./Feedback/Feedback";
import { ComingSoon, ErrorComponent } from "@components/Fallbacks";
import { MobileHeader, PageHeader } from "@components/Headers";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["훈련 일지", "피드백", "전력분석"];

export default function NotesContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("훈련 일지");

  const { width } = useWindowSize();

  const handleReset = () => {
    setSelectedTab("훈련 일지");
  }

  const renderContent = () => {
    switch (selectedTab) {
      case "훈련 일지":
        return <ComingSoon />;
      case "피드백":
        return <Feedback />;
      case "전력분석":
        return <Analysis />;
      default:
        return <ErrorComponent onRefresh={handleReset} label="새로고침" />;
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
