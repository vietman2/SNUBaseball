import type { CollegeType } from "../models/majors";

export const sampleColleges: CollegeType[] = [
  {
    id: 1,
    name: "공과대학",
    short_name: "공대",
    departments: [
      {
        id: 1,
        name: "컴퓨터공학과",
        short_name: "컴퓨터",
        college: "공과대학",
        college_id: 1,
      },
      {
        id: 2,
        name: "전자공학과",
        short_name: "전자",
        college: "공과대학",
        college_id: 1,
      },
    ],
  },
  {
    id: 2,
    name: "인문대학",
    short_name: "인문대",
    departments: [
      {
        id: 3,
        name: "영어영문학과",
        short_name: "영어영문",
        college: "인문대학",
        college_id: 2,
      },
      {
        id: 4,
        name: "철학과",
        short_name: "철학",
        college: "인문대학",
        college_id: 2,
      },
    ],
  },
];
