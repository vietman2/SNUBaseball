import { useState } from "react";
import styled from "styled-components";

import { GameLandscape } from "./GameLandscape";
import { GamePortrait } from "./GamePortrait";
import { AppIcon } from "@components/Icons";
import { palette } from "@colors/palette";
import { TournamentType } from "@models/records/game";

interface Props {
  orientation: 1 | 2; // 1 = landscape, 2 = portrait
  tournament: TournamentType;
  onSelectGame: (gameId: number) => void;
}

export function Tournament({
  orientation,
  tournament,
  onSelectGame,
}: Readonly<Props>) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <Container>
      <Header
        onClick={() => setExpanded(!expanded)}
        radius={expanded ? "0" : "16px"}
        data-testid="header"
      >
        <span>{tournament.name}</span>
        <AppIcon
          icon={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={palette.charcoal}
        />
      </Header>
      <Content height={expanded ? "1600px" : "0"}>
        {tournament.games.map((game, index) =>
          orientation === 1 ? (
            <GameLandscape
              key={index}
              game={game}
              onSelectGame={onSelectGame}
            />
          ) : (
            <GamePortrait
              key={index}
              game={game}
              isLast={index === tournament.games.length - 1}
              onSelectGame={onSelectGame}
            />
          )
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  border-radius: 16px;
  background-color: ${palette.fullWhite};
  user-select: none;
`;

const Header = styled.div<{ radius: string }>`
  display: flex;
  flex: 1;
  justify-content: space-between;
  background-color: ${palette.drawBackground};
  padding: 8px 16px;
  border-radius: 16px;
  border-bottom-left-radius: ${(props) => props.radius};
  border-bottom-right-radius: ${(props) => props.radius};

  transition: border-radius 0.3s ease;

  span {
    font-size: 16px;
    font-weight: 500;
    color: ${palette.charcoal};
  }
`;

const Content = styled.div<{ height: string }>`
  overflow: hidden;
  max-height: ${(props) => (props.height)};
  transition: max-height 0.3s ease-in-out;
  background-color: ${palette.fullWhite};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;
