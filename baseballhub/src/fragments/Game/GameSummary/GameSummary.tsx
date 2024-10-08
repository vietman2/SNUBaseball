import styled from "styled-components";

import { Chip } from "@components/Chips";
import { GameSummaryType } from "@models/records/game";
import { colors } from "@themes/colors";

interface Props {
  game: GameSummaryType;
  onSelectGame: (gameId: number) => void;
}

export function GameSummary({ game, onSelectGame }: Readonly<Props>) {
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
            bgColor="#B5B6B6"
            color="#0B1623"
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

  const getBackgroundColor = () => {
    if (result === "승") {
      return colors.win;
    } else if (result === "무") {
      return colors.draw;
    } else {
      return colors.lose;
    }
  };
  return (
    <ScoreWrapper>
      <TeamName>
        {team}
        <div>
          {our_team ? (
            <Chip
              label={result}
              bgColor={getBackgroundColor()}
              color="#0B1623"
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
  background-color: ${({ theme }) => theme.colors.background100};
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
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Location = styled.div`
  display: flex;
  flex: 2;
  margin-left: 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  padding: 0 8px 0 16px;
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
  margin: 0 24px 0 0;
`;

const TeamName = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Runs = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground900};
`;
