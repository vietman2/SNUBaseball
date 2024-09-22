import { useEffect } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { sampleGameResult } from "@data/records/games";
import { GameStory, GameReport } from "@fragments/Records";
import { useWindowSize } from "@hooks/useWindowSize";
import { ExpandableTab } from "@components/Tabs";
import { Scoreboard } from "@fragments/Records/GameReport/Scoreboard";

interface Props {
  selectedGame: number;
  goBack: () => void;
}

export function GameDetail({ selectedGame, goBack }: Readonly<Props>) {
  const { width } = useWindowSize();

  useEffect(() => {
    // fetch game detail from server
    console.log(selectedGame);
  }, []);

  return (
    <Container>
      <Header onClick={goBack}>
        <div>
          <AppIcon icon="chevron-left" size={24} color="#0B1623" />
          목록
          {width}
        </div>
      </Header>
      {width >= 1920 ? (
        <>
          <WideBoard>
            <Scoreboard game={sampleGameResult} />
          </WideBoard>
          <Contents>
            <Left>
              <ExpandableTab title="경기 레포트" height="1000px">
                <GameReport game={sampleGameResult} />
              </ExpandableTab>
            </Left>
            <Right>
              <GameStory game={sampleGameResult} />
            </Right>
          </Contents>
        </>
      ) : (
        <Contents style={{ flexDirection: "column" }}>
          <Scoreboard game={sampleGameResult} />
          <ExpandableTab title="경기 레포트" height="600px">
            <GameReport game={sampleGameResult} />
          </ExpandableTab>
        </Contents>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: calc(100vh - 200px);
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const WideBoard = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0 240px;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: calc(100vh - 200px);
  padding: 8px 16px;
  gap: 16px;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
