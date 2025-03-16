import { useEffect, useState } from "react";
import styled from "styled-components";

import { ManagerType, PlayerType } from "@models/about";
import { getMembers } from "@services/history";

export function Members() {
  const [managers, setManagers] = useState<ManagerType[]>([]);
  const [players, setPlayers] = useState<PlayerType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMembers(2025);

      if (response) {
        setManagers(response.managers);
        setPlayers(response.players);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <span>매니저</span>
        <MembersList>
          {managers.map((manager) => (
            <Member key={manager.id}>
              <img src={manager.profile_image} alt={manager.name} />
              <span>
                No.{manager.back_number} {manager.name}
              </span>
              <span>
                {manager.major}
                <br />
                {manager.admission_year}
              </span>
            </Member>
          ))}
        </MembersList>
      </Wrapper>
      <Wrapper>
        <span>선수</span>
        <MembersList>
          {players.map((player) => (
            <Member key={player.id} data-testid={`player-${player.id}`}>
              <img src={player.profile_image} alt={player.name} />
              <span>
                No.{player.back_number} {player.name}
              </span>
              <span>
                {player.major}
                <br />
                {player.admission_year}
              </span>
            </Member>
          ))}
        </MembersList>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px 16px;
  gap: 64px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > span {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const MembersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

const Member = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 120px;
  gap: 4px;

  overflow: hidden;

  > img {
    width: 120px;
    height: 150px;
    object-fit: cover;
    border-radius: 16px;

    @media (max-width: 768px) {
      width: 80px;
      height: 100px;
    }
  }

  > span:nth-child(2) {
    font-size: 1rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 0.925rem;
    }
  }

  > span {
    text-align: center;
    font-size: 0.925rem;
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 0.875rem;
      line-height: 1.25;
    }
  }
`;
