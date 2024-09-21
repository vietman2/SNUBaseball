import styled from "styled-components";

import { Chip } from "@components/Chips";
import { palette } from "@colors/palette";
import { GameSummaryType } from "@models/records/game";

interface Props {
  game: GameSummaryType;
  isLast?: boolean;
  onSelectGame: (gameId: number) => void;
}

export function GamePortrait({
  game,
  isLast = false,
  onSelectGame,
}: Readonly<Props>) {
  const getDate = () => {
    // cut year, only return month and day
    // and remove leading 0
    const month = game.date.slice(5, 7).replace(/^0+/, "");
    const day = game.date.slice(8, 10).replace(/^0+/, "");

    return `${month}월 ${day}일`;
  };

  return (
    <Container>
      <TopRow>
        <DateTime>
          {getDate()} {game.time}
        </DateTime>
        <Location>{game.location}</Location>
      </TopRow>
      <Contents>
        <Scores>
          <Score
            team={game.home ? game.opponent : "서울대"}
            runs_scored={game.away_runs}
            our_team={!game.home}
            result={game.result}
          />
          <Score
            team={game.home ? "서울대" : game.opponent}
            runs_scored={game.home_runs}
            our_team={game.home}
            result={game.result}
          />
        </Scores>
        <div>
          <Chip
            label="기록"
            bgColor={palette.contentBackground}
            color={palette.charcoal}
            onClick={() => onSelectGame(game.id)}
          />
        </div>
      </Contents>
    </Container>
  );
}

interface ScoreProps {
  team: string;
  runs_scored: number;
  our_team: boolean;
  result: string;
}

function Score({ team, runs_scored, our_team, result }: Readonly<ScoreProps>) {
  return (
    <ScoreWrapper>
      <TeamName>
        {team}
        <div>
          {our_team ? (
            <Chip
              label={result}
              bgColor={
                result === "승"
                  ? palette.winBackground
                  : result === "무"
                  ? palette.drawBackground
                  : palette.loseBackground
              }
              color={palette.charcoal}
              small
            />
          ) : null}
        </div>
      </TeamName>
      <Runs>{runs_scored}</Runs>
    </ScoreWrapper>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  background-color: ${palette.fullWhite};
  user-select: none;
`;

const TopRow = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 16px;
`;

const DateTime = styled.div`
  display: flex;
  flex: 1;
  font-size: 14px;
  color: ${palette.charcoal};
`;

const Location = styled.div`
  display: flex;
  flex: 2;
  margin-left: 16px;
  font-size: 12px;
  color: ${palette.charcoal};
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  padding: 0 16px;
`;

const Scores = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const ScoreWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 16px 0 0;
`;

const TeamName = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${palette.charcoal};
`;

const Runs = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  color: ${palette.charcoal};
`;
