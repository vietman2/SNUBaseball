import { useState } from "react";
import styled from "styled-components";

import { Board } from "./Board/Board";
import { Information } from "./Information/Information";
import { Notices } from "./Notices/Notices";
import { VerticalDivider } from "@components/Dividers";
import { MobileHeader, PageHeader } from "@components/Headers";
import { Tabs } from "@components/Tabs";
import { Title } from "@components/Texts";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["공지", "정보", "자유게시판", "갤러리"];

export default function ForumContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("공지");

  const { width } = useWindowSize();

  const renderContent = () => {
    switch (selectedTab) {
      case "공지":
        return <Notices />;
      case "정보":
        return <Information />;
      case "자유게시판":
        return <Board />;
      case "갤러리":
        return <div>갤러리화면</div>;
      default:
        return <div>경기결과</div>;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader>
          <Title>게시판</Title>
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
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  margin: 8px;
`;
