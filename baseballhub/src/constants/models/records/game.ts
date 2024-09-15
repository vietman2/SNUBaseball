export type GameSummaryType = {
  id: number;
  date: string;
  time: string;
  opponent: string;
  location: string;
  tournament: string;
  score: string;
  result: string;
  home: boolean;
  image?: string;
};

export type GameResultsType = {
  id: number;
  date: string;
  time: string;
  home_team: string;
  away_team: string;
  location: string;
  tournament: string;
  score: string;
  result: string;
  home_runs: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  away_runs: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  home_records: [number, number, number, number];
  away_records: [number, number, number, number];
};
