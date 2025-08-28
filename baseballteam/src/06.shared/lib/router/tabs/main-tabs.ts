import type { TabGroup } from "@shared/lib/navigation";

export const MainTabs: TabGroup = {
  title: "Main",
  tabs: [
    {
      title: "Home",
      icon: "home",
      href: "/home",
      subtabs: [
        {
          title: "홈",
          href: "/home",
        },
      ],
    },
    {
      title: "기록실",
      icon: "record",
      href: "/records",
      subtabs: [
        {
          title: "경기결과",
          href: "/records/results",
        } /*
        {
          title: "개인기록",
          href: "/records/stats",
        },
        {
          title: "연습경기",
          href: "/records/practices",
        },
        {
          title: "체력측정",
          href: "/records/physicals",
        },*/,
      ],
    },
    {
      title: "게시판",
      icon: "forum",
      href: "/forum",
      subtabs: [
        {
          title: "공지",
          href: "/forum/notices",
        },
        {
          title: "자유게시판",
          href: "/forum/discussions",
        },
      ],
    },
  ],
  adminOnly: false,
};
