type SubTab = {
  title: string;
  path: string;
}

export type Tab = {
  title: string;
  icon: string;
  path?: string;
  submenu?: SubTab[];
};

export const sidebarItems: Tab[] = [
  { title: "Home", icon: "home", path: "/home" },
  {
    title: "스케줄",
    icon: "calendar",
    submenu: [
      { title: "훈련참가표", path: "/schedule/weekly" },
      {
        title: "일자별 훈련계획",
        path: "/schedule/daily",
      },
      {
        title: "월별 일정",
        path: "/",
      },
      {
        title: "출석관리",
        path: "/",
      },
    ],
  },
  {
    title: "훈련",
    icon: "field",
    submenu: [
      { title: "훈련 가이드라인", path: "/training/guidelines" },
      { title: "훈련일지", path: "/" },
      { title: "팀 피드백", path: "/" },
      { title: "개인 피드백", path: "/" },
    ],
  },
  { title: "Archive", icon: "archive" },
  { title: "기록", icon: "record" },
  { title: "장비/물품관리", icon: "storage" },
  {
    title: "관리자 메뉴",
    icon: "admin",
    submenu: [
      {
        title: "부원 관리",
        path: "/admin/members",
      },
      {
        title: "훈련계획 관리",
        path: "/",
      },
      {
        title: "아카이브 관리",
        path: "/",
      },
    ],
  },
];
