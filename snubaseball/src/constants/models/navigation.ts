export type SubTabType = {
  title: string;
  icon: string;
  path: string;
};

export type TabType = {
  title: string;
  icon: string;
  path: string;
  submenu?: SubTabType[];
};
