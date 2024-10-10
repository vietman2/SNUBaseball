import styled from "styled-components";

import { ExpandableTab } from "@components/Tabs";
import { GameSummary } from "@fragments/Game";
import { useWindowSize } from "@hooks/useWindowSize";
import { TournamentType } from "@models/records";

interface TournamentProps {
  tournament: TournamentType;
  onSelectGame: (gameId: number) => void;
}

export function Tournament({ tournament, onSelectGame }: Readonly<TournamentProps>) {
  const { width } = useWindowSize();

  const getNumColumns = () => {
    if (width > 1600) {
      return 4;
    } else if (width > 1200) {
      return 3;
    } else if (width > 880) {
      return 2;
    } else {
      return 1;
    }
  };

  const getHeight = () => {
    const height = 120 * Math.ceil(tournament.games.length / getNumColumns());
    return `${height}px`;
  };

  const columns = getNumColumns();

  const numberOfGames = tournament.games.length;
  const totalSlots = Math.ceil(numberOfGames / columns) * columns;
  const dummyCount = totalSlots - numberOfGames;

  return (
    <TournamentContainer>
      <ExpandableTab title={tournament.name} height={getHeight()}>
        <Content columns={columns}>
          {tournament.games.map((game) => (
            <GameSummary
              key={game.id}
              game={game}
              onSelectGame={onSelectGame}
            />
          ))}
          {Array.from({ length: dummyCount }).map((_, index) => (
            <DummyComponent key={index} />
          ))}
        </Content>
      </ExpandableTab>
    </TournamentContainer>
  );
}

const TournamentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const Content = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);

  & > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
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
