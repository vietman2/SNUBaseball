import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { palette } from "@colors/palette";
import { useEffect } from "react";

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
        <AppIcon icon="chevron-left" size={24} color={palette.charcoal} />
        목록
      </Header>
      <Contents>
        <Left>
          <div>Left</div>
        </Left>
        <Right>
          <div>Right</div>
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
  gap: 8px;
  font-size: 16px;
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 8px 16px;
  gap: 16px;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
