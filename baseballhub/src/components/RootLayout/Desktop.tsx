import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AppIcon, MainLogo } from "@components/Icons";
import { useAuth } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { TabGroup, tabgroups } from "@navigation/tabs";

export function Desktop() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <MainContainer>
      <SidebarWrapper width={isSidebarOpen ? "240px" : "90px"}>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </SidebarWrapper>
      <Outlet />
    </MainContainer>
  );
}

interface Props {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

function Sidebar({ isSidebarOpen, toggleSidebar }: Props) {
  const [activeTab, setActiveTab] = useState<string>("/home");

  const { user } = useAuth();
  const { toggleTheme, isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleTabClick = (path: string) => {
    navigate(path);
    setActiveTab(path);
  };

  const doRender = (tabgroup: TabGroup) => {
    if (!tabgroup.limited) return true;
    return user?.role === "주장";
  };

  const selectLightMode = () => {
    if (isDarkMode) toggleTheme();
  };

  const selectDarkMode = () => {
    if (!isDarkMode) toggleTheme();
  };

  const getActiveColor = () => {
    return isDarkMode ? "#E8E6F2" : "#0F0F70";
  };

  const getInactiveColor = () => {
    return isDarkMode ? "#C5A86F" : "#0B1623";
  };

  return (
    <>
      <SidebarContainer width={isSidebarOpen ? "240px" : "90px"}>
        <SidebarHeader>
          <MainLogo size={60} />
          {isSidebarOpen ? "서울대학교 야구부" : ""}
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
                            ? getActiveColor()
                            : getInactiveColor()
                        }
                      />
                      {isSidebarOpen && tab.title}
                    </TabItem>
                  ))}
                </div>
              )
          )}
        </SidebarContent>
        <SidebarFooter>
          <Switch>
            {isSidebarOpen ? (
              <>
                <IconWrapper
                  $isSelected={!isDarkMode}
                  onClick={selectLightMode}
                >
                  <AppIcon
                    icon="sun"
                    size={24}
                    color="#0F0F70"
                  />
                </IconWrapper>
                <IconWrapper $isSelected={isDarkMode} onClick={selectDarkMode}>
                  <AppIcon
                    icon="moon"
                    size={24}
                    color="#C5A86F"
                  />
                </IconWrapper>
              </>
            ) : (
              <AppIcon
                icon={isDarkMode ? "moon" : "sun"}
                size={24}
                color={isDarkMode ? "#C5A86F" : "#0F0F70"}
              />
            )}
          </Switch>
          <TabItem $isOpen={isSidebarOpen} $isActive={false}>
            <AppIcon icon="person" size={24} color={getInactiveColor()} />
            {isSidebarOpen && "정승원"}
          </TabItem>
        </SidebarFooter>
      </SidebarContainer>
      <SidebarToggleIcon
        onClick={toggleSidebar}
        left={isSidebarOpen ? "225px" : "80px"}
        data-testid="toggle"
      >
        <AppIcon
          icon={isSidebarOpen ? "chevron-left" : "chevron-right"}
          size={24}
          color={getInactiveColor()}
        />
      </SidebarToggleIcon>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background700};
  width: 100%;
  height: 100dvh;
  overflow-x: auto;
  user-select: none;
`;

const SidebarWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: ${({ width }) => width};
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
`;

const SidebarContainer = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background300};
  width: ${(props) => props.width};
  height: 100dvh;
  border-radius: 0 16px 16px 0;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 100;
  overflow-x: hidden;
  overflow-y: auto;

  transition: width 0.3s ease-in-out;
`;

const SidebarHeader = styled.div`
  display: flex;
  margin-top: 8px;
  padding: 16px;
  align-items: center;
  gap: 4px;

  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 16px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const SidebarContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px 0;
  gap: 10px;
`;

const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;

  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const TabGroupTitle = styled.div<{ $isOpen: boolean }>`
  color: ${({ theme, $isOpen }) =>
    $isOpen ? theme.colors.foreground900 : "transparent"};
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
    $isActive ? theme.colors.primary : theme.colors.foreground900};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.background700 : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background500};
  }
`;

const Switch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 12px;
  padding: 8px 12px;
  gap: 4px;
  cursor: pointer;
  font-size: 16px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background700};
`;

const IconWrapper = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;

  border-radius: 8px;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.background300 : "transparent"};
  transition: background-color 0.3s ease-in-out;
`;

const SidebarToggleIcon = styled.div<{ left: string }>`
  position: fixed;
  top: 36px;
  left: ${(props) => props.left};
  cursor: pointer;
  transition: left 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.colors.background300};
  padding: 7px 5px 4px 0;
  border-radius: 10px;
  z-index: 101;
`;
