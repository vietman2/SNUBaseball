import { TabGroup } from "./tabs";

export const Main: TabGroup = {
  title: "Main",
  tabs: [
    {
      title: "Home",
      icon: "home",
      path: "/home",
      subtabs: [
        {
          title: "홈",
          path: "/home",
        },
      ],
    },
    {
      title: "기록실",
      icon: "record",
      path: "/records",
      subtabs: [
        {
          title: "경기결과",
          path: "/records/results",
        },/*
        {
          title: "개인기록",
          path: "/records/stats",
        },
        {
          title: "연습경기",
          path: "/records/practices",
        },
        {
          title: "체력측정",
          path: "/records/physicals",
        },*/
      ],
    },
    {
      title: "게시판",
      icon: "forum",
      path: "/forum",
      subtabs: [
        {
          title: "공지",
          path: "/forum/notices",
        },
        {
          title: "자유게시판",
          path: "/forum/discussions",
        },
      ],
    },
  ],
  limited: false,
};
