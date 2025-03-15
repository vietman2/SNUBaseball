import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { TabType, SubTabType, tabs } from "./tabs";

interface NavigationContextProps {
  tabs: TabType[];
  currentTab: TabType;
  currentSubTab: SubTabType | null;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentTab, setCurrentTab] = useState<TabType>(tabs[0]);
  const [currentSubTab, setCurrentSubTab] = useState<SubTabType | null>(null);

  const location = useLocation();

  useEffect(() => {
    // Handle the case where the user navigates directly to a subtab
    for (const tab of tabs) {
      if (tab.path) {
        if (tab.path === "/") {
          // Only match if the location is exactly "/"
          if (location.pathname === "/") {
            setCurrentTab(tab);
            setCurrentSubTab(null);
            return;
          }
        } else if (location.pathname.startsWith(tab.path)) {
          setCurrentTab(tab);
          setCurrentSubTab(null);
          return;
        }
      }
      // If the tab doesn't have its own path but has subtabs, check them.
      if (tab.subtabs.length > 0) {
        for (const subtab of tab.subtabs) {
          if (
            location.pathname === subtab.path ||
            location.pathname.startsWith(subtab.path)
          ) {
            setCurrentTab(tab);
            setCurrentSubTab(subtab);
            return;
          }
        }
      }
    }
  }, [location]);

  const value = useMemo(
    () => ({
      tabs,
      currentTab,
      currentSubTab,
    }),
    [currentTab, currentSubTab]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
