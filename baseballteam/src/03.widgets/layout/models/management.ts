import type { TabGroup } from "@shared/lib/navigation";

export const ManagementTabs: TabGroup = {
  title: "Management",
  tabs: [
    {
      title: "매니지먼트",
      icon: "checklist",
      path: "/management",
      subtabs: [
        /*
        {
          title: "Team",
          path: "/management/team",
        },
        {
          title: "메디컬",
          path: "/management/medical",
        },*/
        {
          title: "장비 현황",
          path: "/management/equipment",
        },
      ],
    },
    {
      title: "아카이브",
      icon: "archive",
      path: "/archive",
      subtabs: [
        {
          title: "갤러리",
          path: "/archive/gallery",
        },
      ],
    },
  ],
  adminOnly: false,
};
