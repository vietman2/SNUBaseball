import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Chip } from "@components/Chips";
import { ExpandableTab } from "@components/Tabs";
import { useWindowSize } from "@hooks/useWindowSize";
import { ResultType, TournamentType } from "@models/records";

interface Props {
  tournament: TournamentType;
}

export function Tournament({ tournament }: Readonly<Props>) {
  const { width } = useWindowSize();

  const getNumColumns = () => {
    if (width > 1600) {
      return 4;
    } else if (width > 1200) {
      return 3;
    } else if (width > 880) {
      return 2;
    } else {
      return 1;
    }
  };

  const getHeight = () => {
    const height = 120 * Math.ceil(tournament.results.length / getNumColumns());
    return `${height}px`;
  };

  const columns = getNumColumns();

  const numberOfGames = tournament.results.length;
  const totalSlots = Math.ceil(numberOfGames / columns) * columns;
  const dummyCount = totalSlots - numberOfGames;

  return (
    <TournamentContainer>
      <ExpandableTab title={tournament.name} height={getHeight()}>
        <Content $columns={columns}>
          {tournament.results.map((game) => (
            <GameSummary key={game.id} game={game} />
          ))}
          {Array.from({ length: dummyCount }).map((_, index) => (
            <DummyComponent key={index} />
          ))}
        </Content>
      </ExpandableTab>
    </TournamentContainer>
  );
}

interface GameProps {
  game: ResultType;
}

function GameSummary({ game }: Readonly<GameProps>) {
  const navigate = useNavigate();

  const handleGameSelect = () => {
    if (!game.is_finished) {
      return;
    }
    navigate(`/records/results/${game.id}`);
  };

  return (
    <Container>
      <TopRow>
        <DateTime>{game.date_time}</DateTime>
        <Location>{game.location}</Location>
      </TopRow>
      <Contents>
        <Scores>
          <div>
            <span>
              {game.away_team} {!game.is_home && <Result>{game.result}</Result>}
            </span>
            <span>{game.away_score}</span>
          </div>
          <div>
            <span>
              {game.home_team} {game.is_home && <Result>{game.result}</Result>}
            </span>
            <span>{game.home_score}</span>
          </div>
        </Scores>
        <div>
          <button onClick={handleGameSelect} data-testid={`game-${game.id}`}>
            <Chip label={game.is_finished ? "기록" : "예정"} bgColor="#B5B6B6" color="#0B1623" />
          </button>
        </div>
      </Contents>
    </Container>
  );
}

const TournamentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  border-radius: 16px;
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);

  & > div {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
  & > div:nth-child(${(props) => props.$columns}n) {
    border-right: none;
  }
  & > div:nth-last-child(-n + ${(props) => props.$columns}) {
    border-bottom: none;
  }
`;

const DummyComponent = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background200};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 24px;
  background-color: ${({ theme }) => theme.colors.background200};
`;

const TopRow = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const DateTime = styled.div`
  display: flex;
  flex: 1;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Location = styled.div`
  display: flex;
  flex: 2;
  margin-left: 16px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.foreground900};
`;

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
`;

const Scores = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 16px 0 0; 
  }
`;

const Result = styled.span`
  margin-left: 16px;
  padding: 2px 4px;
  color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background500};
`;
