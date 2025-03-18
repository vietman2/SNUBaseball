import { HomecomingResultType, GraduateType } from "@models/events";

export const sampleResults: HomecomingResultType[] = [
  {
    id: 1,
    date: "2024.10.01",
    cover_image: "https://picsum.photos/600/400",
    result: "OB 7:8 YB",
    records: [
      {
        id: 1,
        title: "1회 말",
        content: "OB 홍길동 우월 홈런 (3타점)",
      },
      {
        id: 2,
        title: "3회 초",
        content: "YB 5득점",
      },
      {
        id: 3,
        title: "4회 말",
        content: "YB 전우치 만루 위기 극복",
      },
    ],
  },
  {
    id: 2,
    date: "2024.05.01",
    cover_image: "https://picsum.photos/600/400",
    result: "OB 0:8 YB",
    records: [
      {
        id: 1,
        title: "2회 말",
        content: "YB 4득점",
      },
      {
        id: 2,
        title: "3회 초",
        content: "OB 김철수 3탈삼진",
      },
      {
        id: 3,
        title: "4회 말",
        content: "YB 3득점",
      },
    ],
  },
];

const sampleGraduates: GraduateType[] = [
  {
    student_id: "1",
    name: "홍길동",
    admission_year: 2020,
    major: "체육교육과",
    role: "선수",
    num_semesters: 8,
    thoughts: "소감입니다.",
    profile_image: "https://picsum.photos/200/300",
  },
  {
    student_id: "2",
    name: "김철수",
    admission_year: 2019,
    major: "기계공학과",
    role: "선수",
    num_semesters: 10,
    thoughts: "소감입니다.",
    profile_image: "https://picsum.photos/200/300",
  },
  {
    student_id: "3",
    name: "박영희",
    admission_year: 2021,
    major: "경영학과",
    role: "매니저",
    num_semesters: 6,
    thoughts: "소감입니다.",
    profile_image: "https://picsum.photos/200/300",
  },
  {
    student_id: "4",
    name: "이철민",
    admission_year: 2019,
    major: "체육교육과",
    role: "선수",
    num_semesters: 10,
    thoughts: "소감입니다.",
    profile_image: "https://picsum.photos/200/300",
  },
];

export const sampleGraduatesGroup = {
  year: 2024,
  graduates: sampleGraduates,
};
