export type PlayerType = {
  id: string;
  name: string;
  backNumber: number;
  profileImage: string;
};

export type HistoryType = {
  year: number;
  professor: string;
  head_coach: string;
  head_manager: string;
  captain: string;
  vice_captain: string;
  games: number;
  num_players: number;
  num_managers: number;
}
