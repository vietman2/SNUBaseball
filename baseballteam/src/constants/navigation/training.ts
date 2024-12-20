import { TabGroup } from "./tabs";

export const Training: TabGroup = {
  title: "Training",
  tabs: [
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
    },
    {
      title: "Notes",
      icon: "diary",
      path: "/notes",
      subtabs: [
        {
          title: "피드백",
          path: "/notes/feedback",
        },
        {
          title: "훈련 가이드",
          path: "/notes/guidelines",
        },
      ],
    },
  ],
  limited: false,
};
