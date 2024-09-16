type Tab = {
  title: string;
  icon: string;
  path: string;
};

export type TabGroup = {
  title: string;
  tabs: Tab[];
  limited: boolean;
};

const Main: TabGroup = {
  title: "Main",
  tabs: [
    { title: "Home", icon: "home", path: "/home" },
    { title: "기록실", icon: "record", path: "/records" },
    { title: "게시판", icon: "forum", path: "/forum" },
    { title: "갤러리", icon: "gallery", path: "/gallery" },
    { title: "자료실", icon: "archive", path: "/archive" },
  ],
  limited: false,
};

const Training: TabGroup = {
  title: "Training",
  tabs: [
    { title: "훈련 일정", icon: "calendar", path: "/schedule" },
    { title: "훈련 가이드라인", icon: "guide", path: "/guidelines" },
    { title: "훈련 일지", icon: "diary", path: "/journals" },
    { title: "피드백", icon: "feedback", path: "/feedback" },
  ],
  limited: false,
};

const Admin: TabGroup = {
  title: "Admin",
  tabs: [
    { title: "부원 관리", icon: "person", path: "/members" },
  ],
  limited: true,
};

export const tabgroups: TabGroup[] = [Main, Training, Admin];
