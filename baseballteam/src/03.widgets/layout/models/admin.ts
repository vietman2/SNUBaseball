import type { TabGroup } from "@shared/lib/navigation";

export const AdminTabs: TabGroup = {
  title: "Admin",
  tabs: [
    {
      title: "팀 관리",
      icon: "management",
      path: "/team",
      subtabs: [
        {
          title: "명부관리",
          path: "/team/members",
        },
        {
          title: "팀 정보",
          path: "/team/info",
        },
        {
          title: "회의록",
          path: "/team/minutes",
        },
      ],
    },
    {
      title: "회계",
      icon: "money",
      path: "/accountings",
      subtabs: [
        {
          title: "대시보드",
          path: "/accountings/dashboard",
        },
        {
          title: "내역",
          path: "/accountings/history",
        },
      ],
    },
  ],
  adminOnly: true,
};
