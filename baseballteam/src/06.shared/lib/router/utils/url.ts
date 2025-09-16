/**
 * currentPath를 받아서, 현재 탭과 서브탭을 파싱한다.
 *   - currentPath는 Provider에서 제공하는 location.pathname을 사용한다.
 */

import type { SubTabType, TabGroup, TabType } from "../models/types";
import { AdminTabs } from "../tabs/admin-tabs";
import { MainTabs } from "../tabs/main-tabs";
import { ManagementTabs } from "../tabs/management-tabs";
import { TrainingTabs } from "../tabs/training-tabs";

type ParsedPathType = {
  tab: TabType | null;
  subTab: SubTabType | null;
};

export function getAllTabs(isAdminMode: boolean): TabGroup[] {
  if (isAdminMode) {
    return [MainTabs, TrainingTabs, ManagementTabs, AdminTabs];
  }

  return [MainTabs, TrainingTabs, ManagementTabs];
}

function findActiveTab(isAdminMode: boolean, slug?: string): TabType | null {
  if (!slug) return null;

  const allTabs = getAllTabs(isAdminMode).flatMap((group) => group.tabs);

  return allTabs.find((tab) => tab.href === slug) || null;
}

function findActiveSubTab(
  activeTab: TabType | null,
  slug?: string
): SubTabType | null {
  if (!activeTab || !slug) return null;

  return activeTab.subtabs.find((subtab) => subtab.href === slug) || null;
}

export function parseCurrentPath(
  currentPath: string,
  isAdminMode: boolean
): ParsedPathType {
  const segments = currentPath.split("/").filter(Boolean);

  const tabSlug = segments[0] ? `/${segments[0]}` : undefined;
  const subTabSlug = segments[1] ? `/${segments[0]}/${segments[1]}` : undefined;

  const activeTab = findActiveTab(isAdminMode, tabSlug);
  const activeSubTab = findActiveSubTab(activeTab, subTabSlug);

  return { tab: activeTab, subTab: activeSubTab };
}
