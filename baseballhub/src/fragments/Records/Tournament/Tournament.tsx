import styled from "styled-components";

import { GamePortrait } from "./GamePortrait";
import { ExpandableTab } from "@components/Tabs";
import { palette } from "@colors/palette";
import { useWindowSize } from "@hooks/useWindowSize";
import { TournamentType } from "@models/records/game";

interface Props {
  tournament: TournamentType;
  onSelectGame: (gameId: number) => void;
}

export function Tournament({ tournament, onSelectGame }: Readonly<Props>) {
  const { width } = useWindowSize();
  const columns = width > 1600 ? 4 : width > 1200 ? 3 : width > 880 ? 2 : 1;

  const numberOfGames = tournament.games.length;
  const totalSlots = Math.ceil(numberOfGames / columns) * columns;
  const dummyCount = totalSlots - numberOfGames;

  return (
    <Container>
      <ExpandableTab title={tournament.name} height="1600px">
        <Content columns={columns}>
          {tournament.games.map((game, index) => (
            <GamePortrait
              key={index}
              game={game}
              onSelectGame={onSelectGame}
            />
          ))}
          {Array.from({ length: dummyCount }).map((_, index) => (
            <DummyComponent key={index} />
          ))}
        </Content>
      </ExpandableTab>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const Content = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);

  & > div {
    border-bottom: 1px solid ${palette.drawBackground};
    border-right: 1px solid ${palette.drawBackground};
  }
  & > div:nth-child(${(props) => props.columns}n) {
    border-right: none;
  }
  & > div:nth-last-child(-n + ${(props) => props.columns}) {
    border-bottom: none;
  }
`;

const DummyComponent = styled.div`
  display: flex;
  flex: 1;
  background-color: transparent;
`;
