type MemberType = {
  id: string;
  name: string;
  back_number: number;
  profile_image: string;
  major: string;
  admission_year: number;
};

export type PlayerType = {
  position: string;
} & MemberType;

export type ManagerType = {
  role: string;
} & MemberType;

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
};
