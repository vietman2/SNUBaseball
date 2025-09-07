import type { TabGroup } from "@shared/lib/navigation";

export const TrainingTabs: TabGroup = {
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
      title: "훈련",
      icon: "diary",
      href: "/training",
      subtabs: [
        {
          title: "피드백",
          href: "/training/feedback",
        },
        {
          title: "훈련 가이드",
          href: "/training/guidelines",
        },
      ],
    },
  ],
  adminOnly: false,
};
