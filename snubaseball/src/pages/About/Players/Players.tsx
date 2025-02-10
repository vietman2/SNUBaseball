import { useEffect, useState } from "react";
import styled from "styled-components";

import { samplePlayers } from "@data/about";
import { PlayerType } from "@models/about";

export function Players() {
  const [players, setPlayers] = useState<PlayerType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // TODO: Replace with actual API call
      setPlayers(samplePlayers);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <PlayersList>
        {players.map((player) => (
          <Player key={player.id}>
            <img src={player.profileImage} alt={player.name} />
            <span>{player.name}</span>
          </Player>
        ))}
      </PlayersList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px 16px;
`;

const PlayersList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 36px 8px;
`;

const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  > img {
    width: 60px;
    height: 80px;
    object-fit: round;
    border-radius: 8px;
  }

  > span {
    font-size: 1rem;
  }
`;
