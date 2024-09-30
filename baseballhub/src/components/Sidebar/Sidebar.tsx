import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AppIcon, MainLogo } from "@components/Icons";
import { TabGroup, tabgroups } from "@navigation/tabs";
import { useAuth } from "@pages/Auth";

interface Props {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const activeTabColor = "#0F0F70";
const activeTabBackgroundColor = "#E8E6F2";
const inactiveTabColor = "#0B1623";

export function Sidebar({ isSidebarOpen, toggleSidebar }: Props) {
  const [activeTab, setActiveTab] = useState<string>("/home");

  const { user } = useAuth();

  const navigate = useNavigate();

  const handleTabClick = (path: string) => {
    navigate(path);
    setActiveTab(path);
  };

  const doRender = (tabgroup: TabGroup) => {
    if (!tabgroup.limited) return true;
    return user?.role === "주장";
  };

  return (
    <>
      <SidebarContainer $isOpen={isSidebarOpen}>
        <SidebarHeader>
          <MainLogo />
        </SidebarHeader>
        <SidebarContent>
          {tabgroups.map(
            (tabgroup) =>
              doRender(tabgroup) && (
                <div key={tabgroup.title}>
                  <TabGroupTitle $isOpen={isSidebarOpen}>
                    {tabgroup.title}
                  </TabGroupTitle>
                  {tabgroup.tabs.map((tab) => (
                    <TabItem
                      key={tab.title}
                      onClick={() => handleTabClick(tab.path)}
                      $isActive={activeTab === tab.path}
                      $isOpen={isSidebarOpen}
                      data-testid={tab.title}
                    >
                      <AppIcon
                        icon={tab.icon}
                        size={24}
                        color={
                          activeTab === tab.path
                            ? activeTabColor
                            : inactiveTabColor
                        }
                      />
                      {isSidebarOpen && tab.title}
                    </TabItem>
                  ))}
                </div>
              )
          )}
        </SidebarContent>
      </SidebarContainer>
      <SidebarToggleIcon
        onClick={toggleSidebar}
        $isOpen={isSidebarOpen}
        data-testid="toggle"
      >
        <AppIcon
          icon={isSidebarOpen ? "chevron-left" : "chevron-right"}
          size={24}
          color={inactiveTabColor}
        />
      </SidebarToggleIcon>
    </>
  );
}

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  height: 100%;
  width: ${(props) => (props.$isOpen ? "240px" : "90px")};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow-x: hidden;
  transition: width 0.3s ease-in-out;
`;

const SidebarHeader = styled.div`
  padding-top: 20px;
  text-align: center;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  gap: 10px;
`;

const TabGroupTitle = styled.div<{ $isOpen: boolean }>`
  color: ${({ theme, $isOpen }) =>
    $isOpen ? theme.colors.sapphire : "transparent"};
  font-size: 16px;
  font-weight: 500;
  padding: 5px 20px;
`;

const TabItem = styled.div<{ $isActive: boolean; $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isOpen ? "flex-start" : "center")};
  gap: 10px;
  margin: 5px 0;
  padding: 8px 24px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  font-size: 16px;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.sapphire};
  background-color: ${({ $isActive }) =>
    $isActive ? activeTabBackgroundColor : "transparent"};

  &:hover {
    background-color: ${activeTabBackgroundColor};
  }
`;

const SidebarToggleIcon = styled.div<{ $isOpen?: boolean }>`
  position: fixed;
  top: 50%;
  left: ${(props) => (props.$isOpen ? "225px" : "80px")};
  cursor: pointer;
  transition: left 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.colors.lavender};
  padding: 7px 5px 4px 0;
  border-radius: 10px;
  z-index: 101;
`;
