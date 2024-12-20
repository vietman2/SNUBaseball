import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { VerticalDivider } from "@components/Dividers";
import { AppIcon, MainLogo } from "@components/Icons";
import { useAuth } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { TabGroup, TabType, SubTabType, tabgroups } from "@navigation/tabs";
import { logout as logoutRequest } from "@services/auth";

export function DesktopLayout() {
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
    const tab = tabgroups
      .flatMap((group) => group.tabs)
      .find((tab) => tab.path === location.pathname);

    if (tab) {
      setActiveTab(tab);
    } else {
      navigate("/home");
    }
  }, [location.pathname, navigate]);

  return (
    <MainContainer>
      <SidebarWrapper width={isSidebarOpen ? "240px" : "90px"}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          activeTab={activeTab}
        />
      </SidebarWrapper>
      <Contents>
        <Header
          title={activeTab.title}
          subtabs={activeTab.subtabs}
          activeSubTab={activeSubTab}
          setActiveSubtab={setActiveSubTab}
        />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </Contents>
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

interface HeaderProps {
  title: string;
  subtabs: SubTabType[];
  activeSubTab: SubTabType;
  setActiveSubtab: (subtab: SubTabType) => void;
}

function Header({
  title,
  subtabs,
  activeSubTab,
  setActiveSubtab,
}: Readonly<HeaderProps>) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { user, logout } = useAuth();
  const { toggleTheme, isDarkMode, colors } = useTheme();
  const navigate = useNavigate();

  const showMenu = () => {
    setMenuOpen(true);
  };

  const hideMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    const response = await logoutRequest();

    if (response) {
      logout();
      navigate("/login");
    }
  };

  return (
    <HeaderContainer>
      <Wrapper>
        <h1>{title}</h1>
        <VerticalDivider height="36px" bold />
        <Tabs>
          {subtabs.map((tab) => (
            <Tab
              key={tab.title}
              $active={activeSubTab === tab}
              onClick={() => setActiveSubtab(tab)}
            >
              {tab.title}
            </Tab>
          ))}
        </Tabs>
      </Wrapper>
      <Wrapper>
        <IconWrapper onClick={toggleTheme}>
          {isDarkMode ? (
            <AppIcon icon="moon" color={colors.primary} size={20} />
          ) : (
            <AppIcon icon="sun" color={colors.primary} size={20} />
          )}
        </IconWrapper>
        <VerticalDivider height="24px" />
        <MenuContainer
          onMouseEnter={showMenu}
          onMouseOut={hideMenu}
          data-testid="menu"
        >
          <div>
            <img src={user?.profile_image} alt="avatar" />
            <span>{user?.name}</span>
          </div>
          <Menu style={{ display: menuOpen ? "block" : "none" }}>
            <MenuItem onClick={() => {}}>내 프로필</MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
          </Menu>
        </MenuContainer>
      </Wrapper>
    </HeaderContainer>
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

const Contents = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
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

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 24px 0 0;

  position: sticky;
  top: 0;
  z-index: 10;

  border-bottom: 0.5px solid ${({ theme }) => theme.colors.borderLight};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  > h1 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 0 32px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;

  > div {
    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 0.95rem;

    cursor: pointer;

    > img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
    }
  }
`;

const Menu = styled.div`
  display: none;
  position: absolute;
  width: 120px;
  top: 100%;
  right: 0;

  background-color: ${({ theme }) => theme.colors.background100};
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 101;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 16px;
  padding: 8px;
`;

const Tab = styled.div<{ $active: boolean }>`
  padding: 8px 16px;

  font-size: 1.1rem;
  font-weight: ${({ $active }) => ($active ? "700" : "400")};

  cursor: pointer;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.foreground900};

  transition: background-color 0.3s ease-in-out;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  cursor: pointer;
`;
