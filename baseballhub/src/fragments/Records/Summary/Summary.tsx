import styled from "styled-components";

import { GameSummaryType } from "@models/records/game";

interface Props {
  game: GameSummaryType;
}

export function GameSummary({ game }: Readonly<Props>) {
  const getBaseText = () => {
    // cut year, only return month and day
    // and reformat to MM/DD
    const month = game.date.slice(5, 7);
    const day = game.date.slice(8, 10);

    return `${month}/${day} ${game.time} @${game.location} vs${game.opponent}`;
  };

  return (
    <Container>
      <div>{getBaseText()}</div>
      <div>{`${game.score} ${game.result}`}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: white;
`;
