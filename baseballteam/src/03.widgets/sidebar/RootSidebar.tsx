import { useEffect, useState } from "react";
import styled from "styled-components";

import { TabItem } from "./ui/TabItem";
import { ToggleSidebarButton } from "./ui/ToggleSidebarButton";
import { ToggleThemeButton } from "./ui/ToggleThemeButton";
import { useUser } from "@entities/user";
import {
  getAllTabs,
  parseCurrentPath,
  useRouter,
  type SubTabType,
  type TabGroupType,
  type TabType,
} from "@shared/lib/router";
import { Divider } from "@shared/ui/Dividers";

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export function RootSidebar() {
  const [activeTab, setActiveTab] = useState<TabType | null>(null);
  const [activeSubtab, setActiveSubtab] = useState<SubTabType | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const { backgroundLocation } = useRouter();
  const { user } = useUser();

  const tabGroups: TabGroupType[] = getAllTabs(user?.role !== "MEMBER");

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const currentPath = backgroundLocation.pathname;

    const { tab, subTab } = parseCurrentPath(
      currentPath,
      user?.role !== "MEMBER"
    );
    setActiveTab(tab);
    setActiveSubtab(subTab);
  }, [backgroundLocation, user]);

  return (
    <SidebarContainer
      style={{ width: sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH }}
    >
      <Tabs>
        {tabGroups.map((group) => (
          <TabGroup key={group.title}>
            {sidebarOpen && <h4>{group.title}</h4>}
            {group.tabs.map((tab) => (
              <TabItem
                key={tab.title}
                tab={tab}
                isSidebarOpen={sidebarOpen}
                isActive={activeTab?.href === tab.href}
                activeSubTab={activeSubtab}
              />
            ))}
          </TabGroup>
        ))}
      </Tabs>
      <Divider />
      <SidebarFooter>
        <ToggleThemeButton isSidebarOpen={sidebarOpen} />
        <ToggleSidebarButton isOpen={sidebarOpen} toggle={toggleSidebar} />
      </SidebarFooter>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 60px);

  background-color: ${({ theme }) => theme.colors.backgroundDefault};
  border-right: 0.25px solid ${({ theme }) => theme.colors.divider};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05);

  transition: width 0.3s ease;
`;

const Tabs = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px 0;
  gap: 8px;
`;

const TabGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  gap: 8px;
  position: relative;

  h4 {
    margin: 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 600;
  }
`;

const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
`;
