import { useState } from "react";
import styled from "styled-components";

import { History } from "./History/History";
import { ComingSoon, ErrorComponent } from "@components/Fallbacks";
import { MobileHeader, PageHeader } from "@components/Headers";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["대시보드", "전체 내역"];

export default function AccountingsContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("대시보드");

  const { width } = useWindowSize();

  const handleReset = () => {
    setSelectedTab("대시보드");
  }

  const renderContent = () => {
    switch (selectedTab) {
      case "대시보드":
        return <ComingSoon />;
      case "전체 내역":
        return <History />;
      default:
        return <ErrorComponent onRefresh={handleReset} label="새로고침" />;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader
          title="회계"
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
