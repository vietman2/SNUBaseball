import { HistoryType, PlayerType, ManagerType } from "@models/about";

export const sampleManagers: ManagerType[] = [
  {
    id: "1",
    name: "매니저 1",
    profile_image: "https://picsum.photos/200/300?random=1",
    major: "컴퓨터공학과",
    admission_year: 2021,
    role: "매니저",
    back_number: 0,
  },
];

export const samplePlayers: PlayerType[] = [
  {
    id: "1",
    name: "선수 1",
    back_number: 1,
    profile_image: "https://picsum.photos/200/300?random=1",
    position: "투수",
    major: "컴퓨터공학과",
    admission_year: 2021,
  },
  {
    id: "2",
    name: "선수 2",
    back_number: 2,
    profile_image: "https://picsum.photos/200/300?random=2",
    position: "내야수",
    major: "컴퓨터공학과",
    admission_year: 2021,
  },
];

export const sampleHistory: HistoryType[] = [
  {
    year: 2024,
    professor: "김교수",
    head_coach: "이감독",
    captain: "박선수",
    vice_captain: "최선수",
    head_manager: "매니저",
    games: 10,
    num_players: 20,
    num_managers: 5,
  },
  {
    year: 2023,
    professor: "김교수",
    head_coach: "이감독",
    captain: "박선수",
    vice_captain: "최선수",
    head_manager: "매니저",
    games: 10,
    num_players: 20,
    num_managers: 5,
  },
];
