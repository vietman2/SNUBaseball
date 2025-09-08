import { useState } from "react";
import styled from "styled-components";

import { RouterTabs } from "../models/tabs";
import { TabItemMobile } from "./TabItem/TabItemMobile";
import { AppIcon } from "@shared/ui/Icons";

export function TabsMobile() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <TabsButton onClick={toggleSidebar} aria-label="Toggle menu" data-testid="toggle-sidebar-button">
        <AppIcon
          icon={sidebarOpen ? "close" : "menu"}
          size={32}
          color="#0D0D0D"
        />
      </TabsButton>
      <Overlay $isOpen={sidebarOpen} onClick={toggleSidebar} />
      <SidebarPanel id="mobile-sidebar" $isOpen={sidebarOpen} aria-modal="true">
        {RouterTabs.map((tab) => (
          <TabItemMobile key={tab.label} tab={tab} />
        ))}
      </SidebarPanel>
    </>
  );
}

const TabsButton = styled.button`
  display: flex;
  align-items: center;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: fixed;
  top: 64px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

const SidebarPanel = styled.aside<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  width: 80vw;
  position: fixed;
  top: 64px;
  right: 0;

  border-top: 0.5px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.gray100};
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 10;
`;
