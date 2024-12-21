import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { useAuth } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { TabGroup, TabType, SubTabType, tabgroups } from "@navigation/tabs";
import { logout as logoutRequest } from "@services/auth";

export function MobileLayout() {
  const [activeTab, setActiveTab] = useState<TabType>(tabgroups[0].tabs[0]);
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>(
    activeTab.subtabs[0]
  );
  const [isTabsOpen, setIsTabsOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTabs = () => {
    setIsTabsOpen(!isTabsOpen);
  };

  const showMenu = () => {
    setIsMenuOpen(true);
  };

  const hideMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleTabClick = (tab: TabType) => {
    navigate(tab.path);
    setActiveTab(tab);
    setIsTabsOpen(false);
  };

  const doRender = (tabgroup: TabGroup) => {
    if (!tabgroup.limited) return true;
    return user?.is_admin;
  };

  const handleLogout = async () => {
    const response = await logoutRequest();

    if (response) {
      logout();
      navigate("/login");
    }
  };

  useEffect(() => {
    const path = location.pathname.split("/")[1];

    const tab = tabgroups
      .flatMap((group) => group.tabs)
      .find((tab) => tab.path === `/${path}`);

    if (tab) {
      setActiveTab(tab);
      setActiveSubTab(tab.subtabs[0]);
    }
  }, [location.pathname]);

  return (
    <div onClick={hideMenu}>
      <Header $isOpen={isTabsOpen}>
        <button onClick={toggleTabs} data-testid="toggle-tabs">
          <AppIcon
            icon={isTabsOpen ? "close" : "menu"}
            size={24}
            color="#000"
          />
        </button>
        {isTabsOpen ? "서울대 야구부" : activeSubTab.title}
        <MenuContainer>
          <Profile onClick={showMenu} data-testid="menu">
            <img src={user?.profile_image} alt="avatar" />
          </Profile>
          <Menu style={{ display: isMenuOpen ? "block" : "none" }}>
            <button onClick={hideMenu}>내 프로필</button>
            <button onClick={handleLogout}>로그아웃</button>
          </Menu>
        </MenuContainer>
      </Header>
      <Container>
        <Tabs $isOpen={isTabsOpen}>
          {tabgroups.map(
            (tabgroup) =>
              doRender(tabgroup) && (
                <div key={tabgroup.title}>
                  <div>{tabgroup.title}</div>
                  {tabgroup.tabs.map((tab) => (
                    <TabItem
                      key={tab.title}
                      onClick={() => handleTabClick(tab)}
                      $isActive={activeTab === tab}
                      data-testid={tab.title}
                    >
                      <AppIcon
                        icon={tab.icon}
                        size={24}
                        color={
                          activeTab === tab ? colors.primary : colors.borderDark
                        }
                      />
                      {tab.title}
                    </TabItem>
                  ))}
                </div>
              )
          )}
        </Tabs>
        {!isTabsOpen && (
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
        )}
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100dvh - 48px);
  user-select: none;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Header = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  padding: 0 16px;

  position: sticky;
  top: 0;
  z-index: 1000;

  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.3rem;
  font-weight: 600;

  background-color: ${({ theme, $isOpen }) =>
    $isOpen ? theme.colors.background300 : theme.colors.background100};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
`;

const Tabs = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100dvh - 48px);
  padding: 16px;
  gap: 16px;

  position: fixed;
  top: 48px;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};

  background-color: ${({ theme }) => theme.colors.background300};
  transition: left 0.3s ease-in-out;
  z-index: 1000;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    font-size: 1rem;
    font-weight: 600;
  }
`;

const TabItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;

  font-size: 1.1rem;
  font-weight: 600;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.background100 : "transparent"};
`;

const Profile = styled.button`
  display: flex;
  align-items: center;

  > img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Menu = styled.div`
  position: absolute;
  width: 120px;
  top: 100%;
  right: 0;

  background-color: ${({ theme }) => theme.colors.background100};
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 101;

  transition: display 0.9s ease-in-out;

  > button {
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
