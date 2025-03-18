import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";

import { AppIcon, Logo } from "@components/Icons";
import { useNavigation, TabType } from "@contexts/navigation";

export function MobileLayout() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [openTab, setOpenTab] = useState<TabType | null>(null);

  const { currentTab, currentSubTab, tabs } = useNavigation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const goHome = () => {
    navigate("/");

    if (sidebarOpen) {
      toggleSidebar();
    }
  };

  const onTabClick = (tab: TabType) => {
    if (tab.path) {
      setOpenTab(null);
      navigate(tab.path);
      toggleSidebar();
    } else {
      setOpenTab(tab);
    }
  };

  const onSubTabClick = (path: string) => {
    navigate(path);
    setOpenTab(null);
    toggleSidebar();
  };

  return (
    <>
      <Container>
        <Header>
          <button onClick={goHome} data-testid="home-button">
            <Logo />
          </button>
          <span>
            {currentTab.title === "Home"
              ? "서울대학교 야구부"
              : currentTab.title}
          </span>
          <button onClick={toggleSidebar} data-testid="menu-button">
            <AppIcon icon="menu" size={28} />
          </button>
        </Header>
        {currentTab.subtabs.length > 0 && (
          <SubHeader>
            {currentTab.subtabs.map((subtab) => (
              <SubTabHeaderItem
                key={subtab.title}
                onClick={() => navigate(subtab.path)}
                $isActive={currentSubTab?.title === subtab.title}
                data-testid={`subtab-${subtab.title}`}
              >
                {subtab.title}
              </SubTabHeaderItem>
            ))}
          </SubHeader>
        )}
        <Content>
          <Outlet />
        </Content>
      </Container>
      <SidebarContainer $isOpen={sidebarOpen}>
        <SidebarBackdrop onClick={toggleSidebar} />
        <Sidebar>
          <div>
            <button onClick={goHome} data-testid="home-button-sidebar">
              <Logo size={64} />
            </button>
          </div>
          <div>
            {tabs.map((tab) => (
              <div key={tab.title}>
                <button
                  onClick={() => onTabClick(tab)}
                  data-testid={`tab-${tab.title}`}
                >
                  <SidebarItem $isActive={currentTab.title === tab.title}>
                    {tab.title}
                  </SidebarItem>
                </button>
                <SubTabsMenu $open={openTab === tab}>
                  {tab.subtabs.map((subtab) => (
                    <button
                      key={subtab.title}
                      onClick={() => onSubTabClick(subtab.path)}
                      data-testid={`tab-${subtab.title}`}
                    >
                      <SubTabItem>{subtab.title}</SubTabItem>
                    </button>
                  ))}
                </SubTabsMenu>
              </div>
            ))}
          </div>
        </Sidebar>
      </SidebarContainer>
    </>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.background100};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 0 16px;

  position: sticky;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lowEmphasis};

  > span {
    font-family: "Freesentation";
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

const SubHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  position: sticky;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lowEmphasis};
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  min-height: calc(100dvh - 100px);
  padding-bottom: 64px;
`;

const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.5s ease-in-out;
`;

const SidebarBackdrop = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: flex-end;
`;

const Sidebar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 240px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background100};
  z-index: 1000;
  transition: transform 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  overflow-y: auto;

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 36px;
  }

  > div:last-child {
    display: flex;
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

const SidebarItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px 0;

  font-size: 1.1rem;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 400)};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.background100 : theme.colors.primary};

  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : "transparent"};
`;

const SubTabsMenu = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: ${({ $open }) => ($open ? "200px" : "0")};
  gap: 8px;

  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background300};

  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
`;

const SubTabItem = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 12px 0;

  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};

  background-color: transparent;
`;

const SubTabHeaderItem = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 12px 0;

  font-size: 1rem;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.background100 : theme.colors.primary};

  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : "transparent"};
`;
