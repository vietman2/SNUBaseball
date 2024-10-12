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

export type TournamentType = {
  id: number;
  name: string;
  year: number;
  games: GameSummaryType[];
};
