export type PlayerInfoType = {
  id: number;
  name: string;
  position: string;
  back_number: number;
  height: number;
  weight: number;
  profile_image: string;
};

export type StaffInfoType = {
  id: number;
  name: string;
  back_number: number;
  role: string;
  profile_image: string;
};

export type TeamInfoType = {
  year: number;
  professor: string;
  head_coach: string;
  head_manager: string;
  captain: string;
  vice_captain: string;
  games: number;
  wins: number;
  ties: number;
  losses: number;
  num_managers: number;
  num_players: number;
};

export type TeamMembersType = {
  staff: StaffInfoType[];
  managers: StaffInfoType[];
  players: PlayerInfoType[];
};
