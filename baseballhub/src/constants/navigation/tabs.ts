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
    { title: "자료실", icon: "archive", path: "/archive" },
  ],
  limited: false,
};

const Training: TabGroup = {
  title: "Training",
  tabs: [
    { title: "스케줄", icon: "calendar", path: "/schedule" },
    { title: "야구부 일지", icon: "diary", path: "/journal" },
    { title: "훈련 가이드라인", icon: "guide", path: "/guidelines" },
  ],
  limited: false,
};

const Admin: TabGroup = {
  title: "Admin",
  tabs: [
    { title: "주장단 업무", icon: "people", path: "/admin" },
  ],
  limited: true,
};

export const tabgroups: TabGroup[] = [Main, Training, Admin];
