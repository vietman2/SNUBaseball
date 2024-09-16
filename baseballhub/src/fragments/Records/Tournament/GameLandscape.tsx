import styled from "styled-components";

import { Chip } from "@components/Chips";
import { palette } from "@colors/palette";
import { GameSummaryType } from "@models/records/game";

interface Props {
  game: GameSummaryType;
  onSelectGame: (gameId: number) => void;
}

export function GameLandscape({ game, onSelectGame }: Readonly<Props>) {
  const getDate = () => {
    // cut year, only return month and day
    // and remove leading 0
    const month = game.date.slice(5, 7).replace(/^0+/, "");
    const day = game.date.slice(8, 10).replace(/^0+/, "");

    return `${month}월 ${day}일`;
  };

  return (
    <Container>
      <DateTime>
        {getDate()} {game.time}
      </DateTime>
      <Location>{game.location}</Location>
      <Score game={game} />
      <Chip
        label="기록"
        bgColor={palette.contentBackground}
        color={palette.charcoal}
        onClick={() => onSelectGame(game.id)}
      />
    </Container>
  );
}

interface ScoreProps {
  game: GameSummaryType;
}

function Score({ game }: Readonly<ScoreProps>) {
  if (game.home) {
    return (
      <ScoreWrapper>
        <Opponent>{game.opponent}</Opponent>
        <RunsWrapper>
          <RunsScored
            fontWeight={game.away_runs > game.home_runs ? "bold" : "normal"}
          >
            <span>{game.away_runs}</span>
          </RunsScored>
          <Colon>:</Colon>
          <RunsScored
            fontWeight={game.home_runs > game.away_runs ? "bold" : "normal"}
          >
            <span>{game.home_runs}</span>
          </RunsScored>
        </RunsWrapper>
        <Seoul>
          서울대
          <Chip
            label={game.result}
            bgColor={
              game.result === "승"
                ? palette.winBackground
                : game.result === "무"
                ? palette.drawBackground
                : palette.loseBackground
            }
            color={palette.charcoal}
            small
          />
        </Seoul>
      </ScoreWrapper>
    );
  } else {
    return (
      <ScoreWrapper>
        <Seoul>
          <Chip
            label={game.result}
            bgColor={
              game.result === "승"
                ? palette.winBackground
                : game.result === "무"
                ? palette.drawBackground
                : palette.loseBackground
            }
            color={palette.charcoal}
            small
          />
          서울대
        </Seoul>
        <RunsWrapper>
          <RunsScored
            fontWeight={game.away_runs > game.home_runs ? "bold" : "normal"}
          >
            <span>{game.away_runs}</span>
          </RunsScored>
          <Colon>:</Colon>
          <RunsScored
            fontWeight={game.home_runs > game.away_runs ? "bold" : "normal"}
          >
            <span>{game.home_runs}</span>
          </RunsScored>
        </RunsWrapper>
        <Opponent>{game.opponent}</Opponent>
      </ScoreWrapper>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  gap: 24px;
  border-radius: 16px;
  background-color: ${(props) => palette.fullWhite};
  white-space: nowrap;
`;

const DateTime = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
  font-size: 14px;
  color: ${palette.charcoal};
`;

const Location = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  font-size: 12px;
  color: ${palette.charcoal};
`;

const ScoreWrapper = styled.div`
  display: flex;
  flex: 7;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const RunsWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const RunsScored = styled.div<{ fontWeight: "bold" | "normal" }>`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: ${(props) => props.fontWeight};
`;

const Seoul = styled.div`
  display: flex;
  flex: 3;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Opponent = styled.div`
  display: flex;
  flex: 3;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Colon = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;
