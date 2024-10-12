import { NoticeCategoryType, NoticeSimpleType } from "@models/forum";

const sampleCategories: NoticeCategoryType[] = [
  {
    name: "일반",
    color: "#253238",
    bgColor: "#CFD8DC",
  },
  {
    name: "긴급",
    color: "#D84315",
    bgColor: "#FFAB91",
  },
  {
    name: "선수등록",
    color: "#3E2723",
    bgColor: "#D7CCC8",
  },
  {
    name: "시합",
    color: "#006064",
    bgColor: "#B2EBF2",
  },
];

export const sampleNotices: NoticeSimpleType[] = [
  {
    id: 1,
    category: sampleCategories[0],
    title: "유계결석 인정 요청서",
    author: "임준원",
    num_views: 100,
    created_at: "2024-04-01",
  },
  {
    id: 2,
    category: sampleCategories[3],
    title: "도쿄대 교류전 일정 공지",
    author: "임준원",
    num_views: 100,
    created_at: "2024-08-01",
  },
  {
    id: 3,
    category: sampleCategories[1],
    title: "OB전 연락 안내",
    author: "강지민",
    num_views: 100,
    created_at: "2024-10-01",
  },
  {
    id: 4,
    category: sampleCategories[2],
    title:
      "2024년도 선수등록 부원 교육영상 시청",
    author: "김유안",
    num_views: 100,
    created_at: "2024-10-01",
  },
];
