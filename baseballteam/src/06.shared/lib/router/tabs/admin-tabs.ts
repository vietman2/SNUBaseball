import type { TabGroupType } from "@shared/lib/router";

export const AdminTabs: TabGroupType = {
  title: "Admin",
  tabs: [
    {
      title: "부원 관리",
      icon: "people",
      href: "/members",
      subtabs: undefined,
    },
    {
      title: "팀 관리",
      icon: "management",
      href: "/team",
      subtabs: [
        {
          title: "명부관리",
          href: "/team/members",
        },
        {
          title: "팀 정보",
          href: "/team/info",
        },
        {
          title: "회의록",
          href: "/team/minutes",
        },
      ],
    },
    {
      title: "회계",
      icon: "money",
      href: "/accountings",
      subtabs: [
        {
          title: "대시보드",
          href: "/accountings/dashboard",
        },
        {
          title: "내역",
          href: "/accountings/history",
        },
      ],
    },
  ],
  adminOnly: true,
};
