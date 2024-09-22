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

type GameBatterType = {
  name: string;
  number: number;
  positions: string[];
  plate_appearances: number;
  at_bats: number;
  hits: number;
  rbis: number;
  runs_scored: number;
  walks_hbps: number;
  strikeouts: number;
};

export type GamePitcherType = {
  name: string;
  number: number;
  result: string;
  innings_pitched: number;
  batter_faced: number;
  pitches: number;
  hits: number;
  homeruns: number;
  walks: number;
  hbps: number;
  strikeouts: number;
  runs_allowed: number;
  earned_runs: number;
};

export type BattingOrderType = {
  order: number;
  batters: GameBatterType[];
};

export type LineupType = [
  BattingOrderType,
  BattingOrderType,
  BattingOrderType,
  BattingOrderType,
  BattingOrderType,
  BattingOrderType,
  BattingOrderType,
  BattingOrderType,
  BattingOrderType
];

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
  lineup: LineupType;
  pitchers: GamePitcherType[];
};

export type TournamentType = {
  id: number;
  name: string;
  year: number;
  games: GameSummaryType[];
};
