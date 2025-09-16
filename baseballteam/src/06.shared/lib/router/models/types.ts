import {
  type Location as RouterLocation,
  type RouteObject,
} from "react-router";

type BackgroundState = {
  backgroundLocation: RouterLocation;
};

type RouteSlice = {
  base: string;
  routes: RouteObject[];
};

type TabType = {
  title: string;
  icon: string;
  href: string;
  subtabs: SubTabType[];
};

type SubTabType = {
  title: string;
  href: string;
};

type TabGroup = {
  title: string;
  tabs: TabType[];
  adminOnly: boolean;
};

export type {
  BackgroundState,
  RouterLocation,
  RouteSlice,
  TabType,
  SubTabType,
  TabGroup,
};
