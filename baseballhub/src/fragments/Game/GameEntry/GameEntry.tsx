import styled from "styled-components";

import { Subtitle } from "@components/Texts";
import { GameResultsType } from "@models/records/game";

interface Props {
  game: GameResultsType;
}

export function GameEntry({ game }: Readonly<Props>) {
  return (
    <Container>
      <Left>
        <Subtitle>라인업</Subtitle>
        <Lineup>
          <StartingPlayer>
            <div>투수</div>
            <div>
              <div>P</div>
              <div>{game.pitchers[0].name}</div>
            </div>
          </StartingPlayer>
          {game.lineup.map((order, index) => (
            <StartingPlayer key={index}>
              <div>{order.order}번</div>
              <div>
                <div>{order.batters[0].positions[0]}</div>
                <div>{order.batters[0].name}</div>
              </div>
            </StartingPlayer>
          ))}
        </Lineup>
      </Left>
      <Right>
        <Subtitle>교체명단</Subtitle>
        <Bench>
          {game.bench.map((player, index) => (
            <BenchPlayer key={index}>
              <div>{`${player.number} ${player.name}`}</div>
              <div>{player.hand}</div>
            </BenchPlayer>
          ))}
        </Bench>
      </Right>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 8px;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 0 4px;
`;

const Lineup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  overflow-y: auto;
`;

const StartingPlayer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  div:nth-child(1) {
    display: flex;
    justify-content: center;
    width: 40px;
    padding: 4px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.sapphire};
  }

  div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 84px;
    padding: 0 4px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.lavender};
    color: ${({ theme }) => theme.colors.sapphire};
  }
`;

const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 0 4px;
`;

const Bench = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px;
  gap: 8px;
  overflow-y: auto;
`;

const BenchPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 84px;
  padding: 4px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.lavender};
  color: ${({ theme }) => theme.colors.sapphire};

  div:nth-child(1) {
    font-size: 14px;
    font-weight: 600;
  }

  div:nth-child(2) {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.linkText};
  }
`;
