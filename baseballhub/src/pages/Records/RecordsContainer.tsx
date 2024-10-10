import { useState } from "react";
import styled from "styled-components";

import { Results } from "./Results/Results";
import { GameDetail } from "./GameDetail/GameDetail";
import { VerticalDivider } from "@components/Dividers";
import { MobileHeader, PageHeader } from "@components/Headers";
import { Tabs } from "@components/Tabs";
import { Title } from "@components/Texts";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["경기결과", "개인기록", "연습경기", "체력측정"];

export default function RecordsContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("경기결과");
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const { width } = useWindowSize();

  const renderContent = () => {
    switch (selectedTab) {
      case "경기결과":
        if (selectedGame !== null) {
          const goBack = () => setSelectedGame(null);

          return <GameDetail selectedGame={selectedGame} goBack={goBack} />;
        } else {
          return <Results onSelectGame={setSelectedGame} />;
        }
      case "개인기록":
        return <div>개인기록</div>;
      case "연습경기":
        return <div>연습경기</div>;
      case "체력측정":
        return <div>체력측정</div>;
      default:
        return <div>경기결과</div>;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader>
          <Title>기록실</Title>
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
