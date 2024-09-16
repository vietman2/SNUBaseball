import { useEffect } from "react";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { palette } from "@colors/palette";
import { GameStory, GameReport } from "@fragments/Records";

interface Props {
  selectedGame: number;
  goBack: () => void;
}

export function GameDetail({ selectedGame, goBack }: Readonly<Props>) {
  useEffect(() => {
    // fetch game detail from server
    console.log(selectedGame);
  }, []);

  return (
    <Container>
      <Header onClick={goBack}>
        <div>
          <AppIcon icon="chevron-left" size={24} color={palette.charcoal} />
          목록
        </div>
      </Header>
      <Contents>
        <Left>
          <GameReport />
        </Left>
        <Right>
          <GameStory />
        </Right>
      </Contents>
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

  border-right: 1px solid ${palette.grayBorder};
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
