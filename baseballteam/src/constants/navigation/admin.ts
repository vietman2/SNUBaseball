import { TabGroup } from "./tabs";

export const Admin: TabGroup = {
  title: "Admin",
  tabs: [
    {
      title: "주장단 업무",
      icon: "people",
      path: "/admin",
      subtabs: [
        {
          title: "명부관리",
          path: "/admin/members",
        },
        {
          title: "회의록",
          path: "/admin/minutes",
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
  limited: true,
};
