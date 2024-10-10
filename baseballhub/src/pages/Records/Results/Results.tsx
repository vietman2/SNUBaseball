import { useEffect, useState } from "react";
import styled from "styled-components";

import { ChipTabs } from "@components/Tabs";
import { sampleTournaments } from "@data/records";
import { Tournament } from "@fragments/Tournament";
import { TournamentType } from "@models/records";

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
      <ChipTabs
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

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const Wrapper = styled.div`
  display: block;
  flex: 1;
  flex-direction: column;
  margin: 8px 0;
  white-space: nowrap;
`;
