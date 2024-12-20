import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Header } from "./Headers/WideHeader";
import { AppIcon, MainLogo } from "@components/Icons";
import { useAuth } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { TabGroup, TabType, SubTabType, tabgroups } from "@navigation/tabs";

export function RootLayout() {
  const [activeTab, setActiveTab] = useState<TabType>(tabgroups[0].tabs[0]);
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>(
    activeTab.subtabs[0]
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    const tab = tabgroups
      .flatMap((group) => group.tabs)
      .find((tab) => tab.path === path);

    if (tab) {
      setActiveTab(tab);
    } else {
      navigate("/home");
    }
  }, [location]);

  return (
    <MainContainer>
      <SidebarWrapper width={isSidebarOpen ? "240px" : "90px"}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          activeTab={activeTab}
        />
      </SidebarWrapper>
      <Wrapper>
        <Header
          title={activeTab.title}
          subtabs={activeTab.subtabs}
          activeSubTab={activeSubTab}
          setActiveSubtab={setActiveSubTab}
        />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </Wrapper>
    </MainContainer>
  );
}

interface Props {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeTab: TabType;
}

function Sidebar({ isSidebarOpen, toggleSidebar, activeTab }: Readonly<Props>) {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  const doRender = (tabgroup: TabGroup) => {
    if (!tabgroup.limited) return true;
    return user?.is_admin;
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
          <MainLogo size={40} color={isDarkMode ? "white" : "blue"} />
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
                      $isActive={activeTab === tab}
                      $isOpen={isSidebarOpen}
                      data-testid={tab.title}
                    >
                      <AppIcon
                        icon={tab.icon}
                        size={24}
                        color={
                          activeTab === tab
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
      </SidebarContainer>
      <SidebarToggleIcon
        onClick={toggleSidebar}
        $left={isSidebarOpen ? "225px" : "75px"}
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
  background-color: ${({ theme }) => theme.colors.background100};
  width: 100%;
  height: 100dvh;
  overflow-x: auto;
  user-select: none;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const TabItem = styled.div<{ $isActive: boolean; $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isOpen ? "flex-start" : "center")};
  gap: 10px;
  margin: 5px 0;
  padding: 8px 24px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.foreground900};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.background500 : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background500};
  }
`;

const SidebarWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
`;

const SidebarContainer = styled.div<{ width: string }>`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background300};
  width: ${(props) => props.width};
  height: 100dvh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 100;
  overflow-x: hidden;
  overflow-y: auto;

  border-radius: 0 16px 16px 0;
  transition: width 0.3s ease-in-out;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  gap: 0.5rem;

  position: sticky;
  top: 0;
  z-index: 10;

  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-family: "SCDream";
  font-size: 1.1rem;
  font-weight: 900;

  background-color: ${({ theme }) => theme.colors.background300};
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.borderLight};
`;

const SidebarContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px 0;
  gap: 10px;
`;

const TabGroupTitle = styled.div<{ $isOpen: boolean }>`
  color: ${({ theme, $isOpen }) =>
    $isOpen ? theme.colors.foreground900 : "transparent"};
  font-size: 1.1rem;
  font-weight: 500;
  padding: 5px 20px;
`;

const SidebarToggleIcon = styled.div<{ $left: string }>`
  position: fixed;
  top: 14px;
  left: ${(props) => props.$left};
  cursor: pointer;
  transition: left 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.colors.background300};
  padding: 5px 0 0 0;
  border-radius: 8px;
  z-index: 101;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
