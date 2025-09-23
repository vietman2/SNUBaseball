import { RosterMemberType, RosterType } from "../models/roster";

export const samplePlayers: RosterMemberType[] = [
  {
    id: 1,
    member: {
      id: 1,
      name: "홍길동",
      admission_year: 2020,
      birth_date: "2002-03-01",
      profile_image: null,
      major: "컴퓨터공학과",
    },
    role: "player",
    position: "투수",
    hands: "우투우타",
    back_number: 10,
    height: 180,
    weight: 75,
    goal: "최고의 투수가 되겠다!",
  },
  {
    id: 2,
    member: {
      id: 2,
      name: "김철수",
      admission_year: 2019,
      birth_date: "2001-05-15",
      profile_image: null,
      major: "경제학과",
    },
    role: "player",
    position: "포수",
    hands: "좌투좌타",
    back_number: 5,
    height: 175,
    weight: 70,
    goal: "팀의 중심이 되겠다!",
  },
];

export const sampleManagers: RosterMemberType[] = [
  {
    id: 3,
    member: {
      id: 3,
      name: "이영희",
      admission_year: 2018,
      birth_date: "2000-07-20",
      profile_image: null,
      major: "경영학과",
    },
    role: "manager",
    position: "매니저",
    hands: "",
    back_number: 0,
    height: 165,
    weight: 55,
    goal: "팀을 잘 지원하겠다!",
  },
];

export const sampleRoster: RosterType = {
  code: "2025-1",
  managers: sampleManagers,
  players: samplePlayers,
};
