import { createContext, useContext } from "react";

import type { SubTabType, TabGroup, TabType } from "../models/types";

export interface TabsContextType {
  tabGroups: TabGroup[];
  activeTab: TabType | null;
  activeSubTab: SubTabType | null;
}

export const TabsContext = createContext<TabsContextType | undefined>(
  undefined
);

export function useTabs() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }

  return context;
}
