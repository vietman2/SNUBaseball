import type { TabGroupType } from "@shared/lib/router";

export const TrainingTabs: TabGroupType = {
  title: "Training",
  tabs: [
    /*
    {
      title: "스케줄",
      icon: "calendar",
      href: "/schedule",
      subtabs: [
        {
          title: "주간 훈참표",
          href: "/schedule/weekly",
        },
        {
          title: "훈련 일지",
          href: "/schedule/diaries",
        },
        {
          title: "월간 캘린더",
          href: "/schedule/monthly",
        },
      ],
    },*/
    {
      title: "피드백",
      href: "/feedback",
      icon: "feedback",
      subtabs: undefined,
    },
    {
      title: "훈련 가이드",
      href: "/guidelines",
      icon: "diary",
      subtabs: undefined,
    },
    {
      title: "장비 현황",
      icon: "equipment",
      href: "/equipment",
      subtabs: undefined,
    },
  ],
  adminOnly: false,
};
