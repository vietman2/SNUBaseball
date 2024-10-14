import { useState } from "react";
import styled from "styled-components";

import { Members } from "./Members/Members";
import { Minutes } from "./Minutes/Minutes";
import { ErrorComponent } from "@components/Fallbacks";
import { MobileHeader, PageHeader } from "@components/Headers";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["명부관리", "회의록"];

export default function AdminContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("명부관리");

  const { width } = useWindowSize();

  const handleReset = () => {
    setSelectedTab("명부관리");
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "명부관리":
        return <Members />;
      case "회의록":
        return <Minutes />;
      default:
        return <ErrorComponent onRefresh={handleReset} label="새로고침" />;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader
          title="주장단 메뉴"
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
