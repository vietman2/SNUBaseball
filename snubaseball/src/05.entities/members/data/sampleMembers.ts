import { MemberType } from "../models/members";

export const sampleMembers: { players: MemberType[]; managers: MemberType[] } =
  {
    players: [
      {
        type: "PLAYER",
        id: 1,
        name: "홍길동",
        birth_date: "2000-01-01",
        date_joined: "2019-03-01",
        num_semester: 6,
        admission_year: 2019,
        major: "컴퓨터공학과",
        back_number: 10,
        profile_image: null,
        extras: {
          position: "투수",
          height: 180,
          weight: 75,
        },
      },
      {
        type: "PLAYER",
        id: 2,
        name: "김철수",
        birth_date: "2001-02-02",
        date_joined: "2020-03-01",
        num_semester: 4,
        admission_year: 2020,
        major: "경제학과",
        back_number: 23,
        profile_image: null,
        extras: {
          position: "포수",
          height: 175,
          weight: 70,
        },
      },
    ],
    managers: [
      {
        type: "MANAGER",
        id: 3,
        name: "이영희",
        birth_date: "1999-03-03",
        date_joined: "2018-03-01",
        num_semester: 8,
        admission_year: 2018,
        major: "경영학과",
        back_number: null,
        profile_image: null,
      },
    ],
  };
