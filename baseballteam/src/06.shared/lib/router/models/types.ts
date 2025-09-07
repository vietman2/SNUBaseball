export type TabType = {
  title: string;
  icon: string;
  href: string;
  subtabs: SubTabType[];
};

export type SubTabType = {
  title: string;
  href: string;
};

export type TabGroup = {
  title: string;
  tabs: TabType[];
  adminOnly: boolean;
};
