import { createContext, useContext, useMemo, useState } from "react";

import { TabType, SubTabType, tabs } from "./tabs";

interface NavigationContextProps {
  tabs: TabType[];
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  setCurrentSubTab: (subtab: SubTabType) => void;
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

  const value = useMemo(
    () => ({
      tabs,
      currentTab,
      currentSubTab,
      setCurrentTab,
      setCurrentSubTab,
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
