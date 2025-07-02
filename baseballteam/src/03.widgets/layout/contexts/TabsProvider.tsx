import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { AdminTabs } from "../models/admin";
import { MainTabs } from "../models/main";
import { ManagementTabs } from "../models/management";
import { TrainingTabs } from "../models/training";
import { useAuth } from "@shared/lib/auth";
import {
  TabsContext,
  type TabsContextType,
  type TabGroup,
  type TabType,
  type SubTabType,
} from "@shared/lib/navigation";

const tabgroups: TabGroup[] = [
  MainTabs,
  TrainingTabs,
  ManagementTabs,
  AdminTabs,
];

export function TabsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const tabGroups = useMemo<TabGroup[]>(
    () =>
      tabgroups.filter((group) => {
        // Filter out admin tabs if the user is not an admin
        if (group.adminOnly && !user?.is_admin) {
          return tabgroups;
        }
        return group;
      }),
    [user]
  );

  const allTabs = useMemo<TabType[]>(
    () => tabGroups.flatMap((group) => group.tabs),
    [tabGroups]
  );

  // URL 분할
  const segments = location.pathname.split("/").filter(Boolean);
  const parentPath = segments[0] ? `/${segments[0]}` : undefined;
  const childSlug = segments[1];

  // 현재 활성화된 탭과 서브탭 상태
  const activeTab = useMemo<TabType>(() => {
    const found = allTabs.find((tab) => tab.path === parentPath);
    return found ?? allTabs[0]; // 기본값으로 첫 번째 탭을 사용
  }, [allTabs, parentPath]);

  const activeSubTab = useMemo<SubTabType>(() => {
    if (!activeTab || !childSlug) return activeTab.subtabs[0];

    const foundSubTab = activeTab.subtabs.find(
      (subtab) => subtab.path === `/${parentPath}/${childSlug}`
    );
    return foundSubTab ?? activeTab.subtabs[0]; // 기본값으로 첫 번째 서브탭을 사용
  }, [activeTab, parentPath, childSlug]);

  useEffect(() => {
    if (!parentPath || !allTabs.some((t) => t.path === parentPath)) {
      navigate(allTabs[0].path, { replace: true });
    }
  }, [parentPath, allTabs, navigate]);

  const value: TabsContextType = useMemo(
    () => ({
      tabGroups,
      activeTab,
      activeSubTab,
    }),
    [tabGroups, activeTab, activeSubTab]
  );

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}
