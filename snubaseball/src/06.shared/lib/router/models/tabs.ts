type SimpleTab = {
  type: "SIMPLE";
  label: string;
  href: string;
};

type TabWithSubmenu = {
  type: "SUBMENU";
  label: string;
  submenu: Array<{
    label: string;
    href: string;
  }>;
};

export type TabType = SimpleTab | TabWithSubmenu;

export const RouterTabs: TabType[] = [
  {
    type: "SUBMENU",
    label: "소개",
    submenu: [
      { label: "팀 소개", href: "/about" },
      { label: "팀 연혁", href: "/history" },
      { label: "선수 • 매니저", href: "/members" },
      { label: "지도자", href: "/staff" },
    ],
  },
  { type: "SIMPLE", label: "일정", href: "/schedule" },
  { type: "SIMPLE", label: "갤러리", href: "/gallery" },
  {
    type: "SUBMENU",
    label: "문의",
    submenu: [
      { label: "문의하기", href: "/contact" },
      { label: "후원 안내", href: "/support" },
    ],
  },
];
