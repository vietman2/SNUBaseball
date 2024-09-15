import { useEffect, useState } from "react";
import styled from "styled-components";

import { sampleGameResult, sampleGames } from "@data/records/games";
import { GameSummary, Scoreboard } from "@fragments/Records";
import { GameSummaryType } from "@models/records/game";

export default function Results() {
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [games, setGames] = useState<GameSummaryType[]>([]);

  useEffect(() => {
    // TODO: Fetch game results from API
    setGames(sampleGames);
  }, [selectedYear]);

  return (
    <Container>
      <Left>
        <Title>경기 결과</Title>
        <YearPicker
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2019">2024</option>
          <option value="2018">2023</option>
          <option value="2017">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </YearPicker>
        <Games>
          {games.map((game) => (
            <div key={game.id}>
              <GameSummary game={game} />
            </div>
          ))}
        </Games>
      </Left>
      <Right>
        <ScoreboardContainer>
          <Scoreboard game={sampleGameResult} />
        </ScoreboardContainer>
      </Right>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 1rem 0;
`;

const YearPicker = styled.select`
  width: 100px;
  height: 30px;
  margin-right: 10px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const Games = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  border-radius: 10px;
  background-color: white;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const ScoreboardContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  border-radius: 10px;
  background-color: white;
`;
