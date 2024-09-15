import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MainLogo from "@assets/images/logo.png";
import { AppIcon } from "@components/Icons";
import { palette } from "@colors/palette";
import { TabGroup, tabgroups } from "@navigation/tabs";
import { useAuth } from "@pages/Auth";

interface Props {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

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
          <Logo src={MainLogo} alt="Main Logo" />
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
                            ? palette.primary
                            : palette.charcoal
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
          color={palette.charcoal}
        />
      </SidebarToggleIcon>
    </>
  );
}

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${palette.sidebarBackground};
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
  padding-top: 40px;
  text-align: center;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  gap: 20px;
`;

const TabGroupTitle = styled.div<{ $isOpen: boolean }>`
  color: ${(props) => (props.$isOpen ? palette.charcoal : "transparent")};
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
  color: ${(props) => (props.$isActive ? palette.primary : palette.charcoal)};
  background-color: ${(props) =>
    props.$isActive ? palette.activeTab : "transparent"};

  &:hover {
    background-color: ${palette.activeTab};
  }
`;

const SidebarToggleIcon = styled.div<{ $isOpen?: boolean }>`
  position: fixed;
  top: 60px;
  left: ${(props) => (props.$isOpen ? "225px" : "80px")};
  cursor: pointer;
  transition: left 0.3s ease-in-out;
  background-color: ${palette.sidebarBackground};
  padding: 10px 5px 5px 0;
  border-radius: 10px;
  z-index: 101;
`;
