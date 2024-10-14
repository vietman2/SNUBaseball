import { useState } from "react";
import styled from "styled-components";

import { Information } from "./Information/Information";
import { Notices } from "./Notices/Notices";
import { ComingSoon, ErrorComponent } from "@components/Fallbacks";
import { MobileHeader, PageHeader } from "@components/Headers";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["공지", "정보", "갤러리"];

export default function ForumContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("공지");

  const { width } = useWindowSize();

  const handleReset = () => {
    setSelectedTab("공지");
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "공지":
        return <Notices />;
      case "정보":
        return <Information />;
      case "갤러리":
        return <ComingSoon />;
      default:
        return <ErrorComponent onRefresh={handleReset} label="새로고침" />;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader
          title="게시판"
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
