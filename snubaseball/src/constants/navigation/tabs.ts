export type SubTab = {
  title: string;
  path: string;
}

export type Tab = {
  title: string;
  path: string;
  submenu?: SubTab[];
}

export const tabs: Tab[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "소개",
    path: "/about",
    submenu: [
      {
        title: "팀",
        path: "/about/team",
      },
      {
        title: "선수",
        path: "/about/players",
      },
      {
        title: "매니저",
        path: "/about/managers",
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
    submenu: [
      {
        title: "전체",
        path: "/schedule",
      },
      {
        title: "경기",
        path: "/schedule/games",
      },
      {
        title: "훈련",
        path: "/schedule/training",
      },
      {
        title: "행사",
        path: "/schedule/events",
      },
    ],
  },
  {
    title: "아카이브",
    path: "/archive",
    submenu: [
      {
        title: "기록",
        path: "/archive/memories",
      },
      {
        title: "인터뷰",
        path: "/archive/interviews",
      },
    ],
  },
  {
    title: "사이트맵",
    path: "/sitemap",
  },
  {
    title: "문의",
    path: "/ask",
    submenu: [
      {
        title: "FAQ",
        path: "/ask/faq",
      },
      {
        title: "입부 신청",
        path: "/ask/apply",
      },
    ],
  },
];
