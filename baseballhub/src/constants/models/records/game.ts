export type GameSummaryType = {
  id: number;
  date: string;
  time: string;
  opponent: string;
  location: string;
  tournament: string;
  home_runs: number;
  away_runs: number;
  result: string;
  home: boolean;
  notes: string;
};

export type OrderType = {
  order: number;
  name: string;
  number: number;
  position: string;
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
  lineup: [
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType,
    OrderType
  ];
};

export type TournamentType = {
  id: number;
  name: string;
  year: number;
  games: GameSummaryType[];
};
