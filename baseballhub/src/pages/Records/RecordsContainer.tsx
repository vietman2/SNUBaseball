import { useState } from "react";
import styled from "styled-components";

import { Results } from "./Results/Results";
import { GameDetail } from "./Results/GameDetail";
import { Tabs } from "@components/Tabs";
import { Title } from "@components/Texts";
import { palette } from "@colors/palette";

const tabs = ["경기결과", "개인기록", "연습경기", "체력측정"];

export default function RecordsContainer() {
  const [selectedTab, setSelectedTab] = useState<string>("경기결과");
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  const renderContent = () => {
    switch (selectedTab) {
      case "경기결과":
        if (selectedGame !== null) {
          const goBack = () => setSelectedGame(null);

          return <GameDetail selectedGame={selectedGame} goBack={goBack} />;
        } else {
          return <Results onSelectGame={setSelectedGame} />;
        }
      case "기록실":
        return <div>기록실</div>;
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
      <Title>기록실</Title>
      <Tabs tabs={tabs} activeTab={selectedTab} setActiveTab={setSelectedTab} />
      <Content $first={selectedTab === "경기결과"}>{renderContent()}</Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 3rem 0 1rem 0;
`;

const Content = styled.div<{ $first: boolean }>`
  display: flex;
  flex: 1;
  background-color: ${palette.contentBackground};
  padding: 1rem 20px;
  border-radius: 10px;
  border-top-left-radius: ${(props) => (props.$first ? "0" : "10px")};
`;
