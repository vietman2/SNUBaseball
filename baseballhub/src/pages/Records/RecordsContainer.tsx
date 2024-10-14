import { useState } from "react";
import styled from "styled-components";

import { Results } from "./Results/Results";
import { GameDetail } from "./GameDetail/GameDetail";
import { Stats } from "./Stats/Stats";
import { ComingSoon, ErrorComponent } from "@components/Fallbacks";
import { MobileHeader, PageHeader } from "@components/Headers";
import { useWindowSize } from "@hooks/useWindowSize";

const tabs = ["경기결과", "개인기록", "연습경기", "체력측정"];

export default function RecordsContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("경기결과");
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const { width } = useWindowSize();

  const handleReset = () => {
    setSelectedTab("경기결과");
    setSelectedGame(null);
  };

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
        return <Stats />;
      case "연습경기":
        return <ComingSoon />;
      case "체력측정":
        return <ComingSoon />;
      default:
        return <ErrorComponent onRefresh={handleReset} label="새로고침" />;
    }
  };

  return (
    <Container>
      {width > 768 ? (
        <PageHeader
          title="기록실"
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
