type PlayerType = {
  name: string;
  number: number;
  hand: string;
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
  steals: number;
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

type BattingOrderType = {
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
  bench: PlayerType[];
  feedback: string[];
};
