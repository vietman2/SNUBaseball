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

export type {
  BackgroundState,
  RouterLocation,
  RouteSlice,
};
