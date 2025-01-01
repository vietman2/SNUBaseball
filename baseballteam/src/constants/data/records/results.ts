import { ResultType, TournamentType } from "@models/records";

const sampleResults: ResultType[] = [
  {
    id: 1,
    date_time: "8월 1일 09:00",
    location: "Tokyo Dome",
    home_team: "Giants",
    away_team: "Tigers",
    home_score: 5,
    away_score: 3,
    is_home: true,
    is_finished: true,
    result: "승",
  },
  {
    id: 2,
    date_time: "8월 2일 18:00",
    location: "Tokyo Dome",
    home_team: "Giants",
    away_team: "Tigers",
    home_score: 3,
    away_score: 5,
    is_home: false,
    is_finished: false,
    result: "패",
  },
];

export const sampleTournament: TournamentType = {
  id: 1,
  name: "2021 Summer Tournament",
  results: sampleResults,
};
