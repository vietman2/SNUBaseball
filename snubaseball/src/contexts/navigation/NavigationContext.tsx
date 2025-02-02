import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { TabType, SubTabType, tabs } from "./tabs";

interface NavigationContextProps {
  tabs: TabType[];
  currentTab: TabType;
  currentSubTab?: SubTabType | null;
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
    const path = location.pathname.split("/")[1];
    const subpath = location.pathname.split("/")[2];

    const tab = tabs.find((tab) => tab.path === `/${path}`);

    if (tab) {
      setCurrentTab(tab);

      if (subpath) {
        const subtab = tab.subtabs.find(
          (subtab) => subtab.path === `/${path}/${subpath}`
        );
        if (subtab) {
          setCurrentSubTab(subtab);
        }
      }
    }
  }, []);

  const value = useMemo(
    () => ({ tabs, currentTab, currentSubTab }),
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
