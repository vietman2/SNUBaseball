type TabWithSubtabsType = {
  title: string;
  icon: string;
  href: string;
  subtabs: SubTabType[];
};

type SimpleTabType = {
  title: string;
  icon: string;
  href: string;
  subtabs: undefined;
};

export type TabType = TabWithSubtabsType | SimpleTabType;

export type SubTabType = {
  title: string;
  href: string;
};

export type TabGroupType = {
  title: string;
  tabs: TabType[];
  adminOnly: boolean;
};

export type ModalTabType = {
  baseURL: string;
  tabs: {
    label: string;
    href: string;
    icon: string;
  }[];
};
