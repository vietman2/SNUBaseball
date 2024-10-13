export type TabType = {
  title: string;
  icon: string;
  path: string;
};

export type TabGroup = {
  title: string;
  tabs: TabType[];
  limited: boolean;
};

const Main: TabGroup = {
  title: "Main",
  tabs: [
    { title: "Home", icon: "home", path: "/home" },
    { title: "기록실", icon: "record", path: "/records" },
    { title: "게시판", icon: "forum", path: "/forum" },
  ],
  limited: false,
};

const Training: TabGroup = {
  title: "Training",
  tabs: [
    { title: "스케줄", icon: "calendar", path: "/schedule" },
    { title: "Notes", icon: "diary", path: "/notes" },
    { title: "훈련 가이드", icon: "guide", path: "/guidelines" },
  ],
  limited: false,
};

const Management: TabGroup = {
  title: "Management",
  tabs: [
    { title: "매니지먼트", icon: "checklist", path: "/management" },
  ],
  limited: false,
};

const Admin: TabGroup = {
  title: "Admin",
  tabs: [
    { title: "주장단 업무", icon: "people", path: "/admin" },
    { title: "회계", icon: "money", path: "/accountings" },
  ],
  limited: true,
};

export const tabgroups: TabGroup[] = [Main, Training, Management, Admin];
