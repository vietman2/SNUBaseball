import { useState } from "react";
import styled from "styled-components";

import { Members } from "./Members/Members";
import { VerticalDivider } from "@components/Dividers";
import { MobileHeader, PageHeader } from "@components/Headers";
import { Tabs } from "@components/Tabs";
import { Title } from "@components/Texts";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["명부관리", "회계"];

export default function AdminContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("명부관리");

  const { width } = useWindowSize();

  const renderContent = () => {
    switch (selectedTab) {
      case "명부관리":
        return <Members />;
      case "회계":
        return <div>회계</div>;
      default:
        return <div>경기결과</div>;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader>
          <Title>주장단 메뉴</Title>
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
