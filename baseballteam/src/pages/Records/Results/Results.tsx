import { useEffect, useState } from "react";
import styled from "styled-components";

import { Loading } from "@components/Fallbacks";
import { Tournament } from "@fragments/Results";
import { TournamentType } from "@models/records";
import { getResults } from "@services/records";

export function Results() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [tournaments, setTournaments] = useState<TournamentType[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getResults(selectedYear);

      if (response) {
        setTournaments(response);
      } else {
        setTournaments([]);
      }

      setLoading(false);
    };

    fetchData();
  }, [selectedYear]);

  return (
    <Container>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        data-testid="year-select"
      >
        <option value={2024}>2024</option>
        <option value={2023}>2023</option>
        <option value={2022}>2022</option>
        <option value={2021}>2021</option>
        <option value={2020}>2020</option>
      </select>
      <Wrapper>
        {loading ? (
          <Loading />
        ) : (
          <>
            {tournaments.map((tournament) => (
              <Tournament key={tournament.id} tournament={tournament} />
            ))}
          </>
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px 16px;

  select {
    align-items: center;
    width: 60px;
    height: 26px;
    padding: 4px 8px;
    border-radius: 8px;
    border: none;
    color: ${({ theme }) => theme.colors.foreground900};
    background-color: ${({ theme }) => theme.colors.background700};
  }
`;

const Wrapper = styled.div`
  display: block;
  flex: 1;
  flex-direction: column;
  margin: 8px 0;
  white-space: nowrap;
`;
