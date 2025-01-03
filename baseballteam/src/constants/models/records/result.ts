export type ResultType = {
  id: number;
  date_time: string;
  location: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  is_home: boolean;
  is_finished: boolean;
  result: string;
};

export type TournamentType = {
  id: number;
  name: string;
  results: ResultType[];
};

type GamePlayerType = {
  name: string;
  position: string;
  back_number: number;
  profile_position: string;
}

export type LineupType = {
  starting_pitcher: GamePlayerType;
  order: GamePlayerType[];
  bench: GamePlayerType[];
  managers: GamePlayerType[];
}

export type GameDetailsType = {
  id: number;
  youtube_videoid: string;
  lineup: LineupType;
};
