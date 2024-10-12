import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AppIcon } from "@components/Icons";
import { useAuth } from "@contexts/auth";
import { TabGroup, TabType, tabgroups } from "@navigation/tabs";

const activeTabColor = "#0F0F70";
const activeTabBackgroundColor = "#B1BDCD";
const inactiveTabColor = "#0B1623";

export function Mobile() {
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tab: TabType) => {
    navigate(tab.path);
    setActiveTab(tab.title);
    setIsMenuOpen(false);
  };

  const doRender = (tabgroup: TabGroup) => {
    if (!tabgroup.limited) return true;
    return user?.role === "주장";
  };

  return (
    <>
      <Header $isMenuOpen={isMenuOpen}>
        <button onClick={toggleMenu} data-testid="toggle">
          <AppIcon
            icon={isMenuOpen ? "close" : "menu"}
            size={24}
            color="#000"
          />
        </button>
        {isMenuOpen ? "서울대 야구부" : activeTab}
        <button onClick={() => {}}>
          <AppIcon icon="person" size={24} color="#000" />
        </button>
      </Header>
      <Container>
        <Menu $isMenuOpen={isMenuOpen}>
          {tabgroups.map(
            (tabgroup) =>
              doRender(tabgroup) && (
                <div key={tabgroup.title}>
                  <div>{tabgroup.title}</div>
                  {tabgroup.tabs.map((tab) => (
                    <MenuItem
                      key={tab.title}
                      onClick={() => handleTabClick(tab)}
                      $isActive={activeTab === tab.title}
                      data-testid={tab.title}
                    >
                      <AppIcon
                        icon={tab.icon}
                        size={24}
                        color={
                          activeTab === tab.title
                            ? activeTabColor
                            : inactiveTabColor
                        }
                      />
                      {tab.title}
                    </MenuItem>
                  ))}
                </div>
              )
          )}
        </Menu>
        {!isMenuOpen && (
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100dvh - 50px);
  background-color: ${({ theme }) => theme.colors.background700};
  user-select: none;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background300};
`;

const Header = styled.div<{ $isMenuOpen: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 16px;

  position: sticky;
  top: 0;
  z-index: 1000;

  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  font-weight: 600;

  background-color: ${({ theme, $isMenuOpen }) =>
    $isMenuOpen ? theme.colors.background300 : theme.colors.background700};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.borderLight}`};
`;

const Menu = styled.div<{ $isMenuOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100dvh - 50px);
  padding: 16px;
  gap: 16px;

  position: fixed;
  top: 50px;
  left: ${({ $isMenuOpen }) => ($isMenuOpen ? "0" : "-100%")};

  background-color: ${({ theme }) => theme.colors.background300};
  transition: left 0.3s ease-in-out;
  z-index: 1000;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;

    font-size: 16px;
    font-weight: 600;
  }
`;

const MenuItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;

  font-size: 18px;
  font-weight: 600;
  background-color: ${({ $isActive }) =>
    $isActive ? activeTabBackgroundColor : "transparent"};
`;
