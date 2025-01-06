import {
  PlayerInfoType,
  StaffInfoType,
  TeamInfoType,
  TeamMembersType,
} from "@models/team";

export const samplePlayerInfo: PlayerInfoType = {
  id: 1,
  name: "홍길동",
  position: "투수",
  back_number: 1,
  height: 180,
  weight: 80,
  profile_image: "https://via.placeholder.com/150",
};

export const sampleStaffInfo: StaffInfoType = {
  id: 1,
  name: "김철수",
  role: "코치",
  back_number: 1,
  profile_image: "https://via.placeholder.com/150",
};

export const sampleTeamMembers: TeamMembersType = {
  staff: [sampleStaffInfo],
  managers: [sampleStaffInfo],
  players: [samplePlayerInfo],
};

export const sampleTeamInfo: TeamInfoType = {
  year: 2023,
  professor: "김교수",
  head_coach: "김감독",
  head_manager: "김매니저",
  captain: "김주장",
  vice_captain: "김부주장",
  games: 10,
  wins: 5,
  ties: 2,
  losses: 3,
  num_managers: 2,
  num_players: 20,
};
