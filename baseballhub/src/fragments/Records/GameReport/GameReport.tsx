import styled from "styled-components";

import { Lineup } from "./Lineup";
import { Notes } from "./Notes";
import { Scoreboard } from "./Scoreboard";
import { Title } from "@components/Texts";
import { sampleGameResult } from "@data/records/games";

export function GameReport() {
  return (
    <Container>
      <Title>경기 레포트</Title>
      <Scoreboard game={sampleGameResult} />
      <Middle>
        <Left>
          <Lineup lineup={sampleGameResult.lineup} />
        </Left>
        <Right>
          <Notes />
        </Right>
      </Middle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const Middle = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 16px 0;
`;

const Left = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`;
