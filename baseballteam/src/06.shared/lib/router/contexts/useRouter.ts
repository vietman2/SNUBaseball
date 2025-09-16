import { createContext, useContext } from "react";

import type { RouterLocation } from "../models/types";

export interface RouterContextType {
  backgroundLocation: RouterLocation;
  displayLocation: RouterLocation;
  isModal: boolean;
}

export const RouterContext = createContext<RouterContextType | undefined>(
  undefined
);

export function useRouter() {
  const context = useContext(RouterContext);

  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }

  return context;
}
