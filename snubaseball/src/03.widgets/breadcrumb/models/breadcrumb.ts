type DummyBreadcrumbItemType = {
  label: string;
  isLastItem: true;
  href: null;
};

type RealBreadcrumbItemType = {
  label: string;
  isLastItem: false;
  href: string;
};

export type BreadcrumbItemType =
  | DummyBreadcrumbItemType
  | RealBreadcrumbItemType;
