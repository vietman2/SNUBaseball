import { useEffect, useState } from "react";
import styled from "styled-components";

import { ChipSelector } from "@components/Selectors";
import { ExpandableTab } from "@components/Tabs";
import { sampleTournaments } from "@data/records/games";
import { GameSummary } from "@fragments/Game";
import { useWindowSize } from "@hooks/useWindowSize";
import { TournamentType } from "@models/records/game";

const years = ["2024", "2023", "2022", "2021", "2020"];

interface Props {
  onSelectGame: (gameId: number) => void;
}

export function Results({ onSelectGame }: Readonly<Props>) {
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [tournaments, setTournaments] = useState<TournamentType[]>([]);

  useEffect(() => {
    // TODO: Fetch game results from API
    setTournaments(sampleTournaments);
  }, []);

  return (
    <Container>
      <ChipSelector
        options={years}
        selected={selectedYear}
        onSelect={setSelectedYear}
      />
      <Wrapper>
        {tournaments.map((tournament) => (
          <Tournament
            key={tournament.id}
            tournament={tournament}
            onSelectGame={onSelectGame}
          />
        ))}
      </Wrapper>
    </Container>
  );
}

interface TournamentProps {
  tournament: TournamentType;
  onSelectGame: (gameId: number) => void;
}

function Tournament({ tournament, onSelectGame }: Readonly<TournamentProps>) {
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
  const columns = getNumColumns();

  const numberOfGames = tournament.games.length;
  const totalSlots = Math.ceil(numberOfGames / columns) * columns;
  const dummyCount = totalSlots - numberOfGames;

  return (
    <TournamentContainer>
      <ExpandableTab title={tournament.name} height="1600px">
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

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: block;
  flex: 1;
  flex-direction: column;
  margin: 8px 0;
  padding: 0 16px;
  white-space: nowrap;
`;

const TournamentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const Content = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);

  & > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
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
