import {
  RosterMemberType,
  RosterMemberDetailsType,
  RosterType,
} from "../models/roster";

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
    back_number: 10,
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
    back_number: 5,
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
    back_number: 0,
  },
];

export const sampleRoster: RosterType = {
  code: "2025-1",
  managers: sampleManagers,
  players: samplePlayers,
};

export const samplePlayerDetails: RosterMemberDetailsType = {
  id: 1,
  member: {
    id: 1,
    name: "홍길동",
    admission_year: 2020,
    birth_date: "2002-03-01",
    profile_image: null,
    major: "컴퓨터공학과",
  },
  role: "선수",
  back_number: 10,
  height: 180,
  weight: 75,
  hands: "우투우타",
  position: "투수",
  goal: "팀 우승",
};

export const sampleManagerDetails: RosterMemberDetailsType = {
  id: 3,
  member: {
    id: 3,
    name: "이영희",
    admission_year: 2018,
    birth_date: "2000-07-20",
    profile_image: null,
    major: "경영학과",
  },
  role: "매니저",
  back_number: 0,
  height: 0,
  weight: 0,
  hands: "",
  position: "",
  goal: "팀 관리 및 지원",
};
