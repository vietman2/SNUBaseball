import type { TabGroup } from "@shared/lib/navigation";

export const ManagementTabs: TabGroup = {
  title: "Management",
  tabs: [
    {
      title: "매니지먼트",
      icon: "checklist",
      href: "/management",
      subtabs: [
        /*
        {
          title: "Team",
          href: "/management/team",
        },
        {
          title: "메디컬",
          href: "/management/medical",
        },*/
        {
          title: "장비 현황",
          href: "/management/equipment",
        },
      ],
    },
    {
      title: "아카이브",
      icon: "archive",
      href: "/archive",
      subtabs: [
        {
          title: "갤러리",
          href: "/archive/gallery",
        },
      ],
    },
  ],
  adminOnly: false,
};
