import { useEffect, useState } from "react";
import styled from "styled-components";

import { ChipSelector } from "@components/Selectors";
import { sampleTournaments } from "@data/records/games";
import { Tournament } from "@fragments/Records";
import { useOrientation } from "@hooks/useOrientation";
import { TournamentType } from "@models/records/game";

const years = ["2024", "2023", "2022", "2021", "2020"];

interface Props {
  onSelectGame: (gameId: number) => void;
}

export function Results({ onSelectGame }: Readonly<Props>) {
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [tournaments, setTournaments] = useState<TournamentType[]>([]);

  const orientation = useOrientation();

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
        {tournaments.map((tournament, index) => (
          <Tournament
            key={index}
            orientation={orientation}
            tournament={tournament}
            onSelectGame={onSelectGame}
          />
        ))}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: calc(100vh - 200px);
`;

const Wrapper = styled.div`
  display: block;
  flex: 1;
  flex-direction: column;
  height: 100%;
  margin: 16px 0;
  padding: 0 16px;
  white-space: nowrap;
  overflow-y: auto;
`;
