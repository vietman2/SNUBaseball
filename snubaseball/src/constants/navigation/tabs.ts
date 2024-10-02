import { TabType } from "@models/navigation";

export const aboutTab: TabType = {
  title: "소개",
  icon: "about",
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
};

export const scheduleTab: TabType = {
  title: "일정",
  icon: "calendar",
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
};

export const archiveTab: TabType = {
  title: "아카이브",
  icon: "archive",
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
};

export const askTab: TabType = {
  title: "문의",
  icon: "question",
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
};

export const tabs: TabType[] = [
  {
    title: "Home",
    icon: "home",
    path: "/",
  },
  aboutTab,
  scheduleTab,
  archiveTab,
  askTab,
];
