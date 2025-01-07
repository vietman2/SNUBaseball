import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { TeamTableHeader, TeamTableRow } from "@fragments/Team";
import { TeamInfoType } from "@models/team";
import { getTeams } from "@services/team";

export function TeamList() {
  const [teams, setTeams] = useState<TeamInfoType[]>([]);

  const navigate = useNavigate();

  const handleDetail = (year: number) => {
    navigate(`/team/info/${year}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTeams();

      if (response) {
        setTeams(response);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <TeamTableHeader />
      {teams.map((team) => (
        <button
          key={team.year}
          onClick={() => handleDetail(team.year)}
          data-testid={`team-${team.year}`}
        >
          <TeamTableRow team={team} />
        </button>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
`;
