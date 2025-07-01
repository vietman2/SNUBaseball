export type TabType = {
  title: string;
  icon: string;
  path: string;
  subtabs: SubTabType[];
};

export type SubTabType = {
  title: string;
  path: string;
};

export type TabGroup = {
  title: string;
  tabs: TabType[];
  adminOnly: boolean;
};
