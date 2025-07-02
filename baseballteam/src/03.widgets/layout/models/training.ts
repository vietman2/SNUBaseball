import type { TabGroup } from "@shared/lib/navigation";

export const TrainingTabs: TabGroup = {
  title: "Training",
  tabs: [
    /*
    {
      title: "스케줄",
      icon: "calendar",
      path: "/schedule",
      subtabs: [
        {
          title: "주간 훈참표",
          path: "/schedule/weekly",
        },
        {
          title: "훈련 일지",
          path: "/schedule/diaries",
        },
        {
          title: "월간 캘린더",
          path: "/schedule/monthly",
        },
      ],
    },*/
    {
      title: "훈련",
      icon: "diary",
      path: "/training",
      subtabs: [
        {
          title: "피드백",
          path: "/training/feedback",
        },
        {
          title: "훈련 가이드",
          path: "/training/guidelines",
        },
      ],
    },
  ],
  adminOnly: false,
};
