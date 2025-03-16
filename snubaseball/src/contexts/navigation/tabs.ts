export type TabType = {
  title: string;
  subtabs: SubTabType[];
  path?: string;
};

export type SubTabType = {
  title: string;
  path: string;
};

export const tabs: TabType[] = [
  {
    title: "Home",
    path: "/",
    subtabs: [],
  },
  {
    title: "소개",
    subtabs: [
      {
        title: "연혁",
        path: "/about/history",
      },
      {
        title: "팀 소개",
        path: "/about/team",
      },
      {
        title: "선수",
        path: "/about/players",
      },
      {
        title: "지도자",
        path: "/about/staff",
      },
    ],
  },
  {
    title: "일정",
    path: "/schedule",
    subtabs: [],
  },
  {
    title: "아카이브",
    subtabs: [
      {
        title: "갤러리",
        path: "/gallery",
      },
      {
        title: "인터뷰",
        path: "/interviews",
      },
    ],
  },
];
