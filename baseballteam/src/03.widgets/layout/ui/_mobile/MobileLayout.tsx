import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import styled from "styled-components";

import { MobileTabs } from "./_tabs";
import { useAuth } from "@shared/lib/auth";
import { useTabs, type SubTabType } from "@shared/lib/navigation";
import { AppIcon } from "@shared/ui/Icons";

export function MobileLayout() {
  const [isTabsOpen, setIsTabsOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const { activeTab, activeSubTab } = useTabs();
  const navigate = useNavigate();

  const toggleTabs = () => {
    setIsTabsOpen(!isTabsOpen);
  };

  const showMenu = () => {
    setIsMenuOpen(true);
  };

  const hideMenu = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  const handleSubTabClick = (subtab: SubTabType) => {
    navigate(subtab.path);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        hideMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, hideMenu]);

  return (
    <div>
      <Header $isOpen={isTabsOpen}>
        <button onClick={toggleTabs} data-testid="toggle-tabs">
          <AppIcon
            icon={isTabsOpen ? "close" : "menu"}
            size={24}
            color="#000"
          />
        </button>
        {isTabsOpen ? "서울대 야구부" : activeTab.title}
        <MenuContainer ref={ref}>
          <Profile onClick={showMenu} data-testid="menu">
            {user?.profile_image ? (
              <img src={user?.profile_image} alt="avatar" />
            ) : (
              <AppIcon icon="person" size={20} />
            )}
          </Profile>
          <Menu style={{ display: isMenuOpen ? "block" : "none" }}>
            <button onClick={hideMenu}>내 프로필</button>
          </Menu>
        </MenuContainer>
      </Header>
      <Subheader>
        {activeTab.subtabs.map((subtab) => (
          <SubTab
            key={subtab.title}
            onClick={() => handleSubTabClick(subtab)}
            $isActive={activeSubTab === subtab}
            data-testid={subtab.title}
          >
            {subtab.title}
          </SubTab>
        ))}
      </Subheader>
      <Container>
        <MobileTabs isTabsOpen={isTabsOpen} setIsTabsOpen={setIsTabsOpen} />
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
  height: calc(100dvh - 96px);
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
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
`;

const Subheader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  gap: 8px;

  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.05rem;
  font-weight: 600;

  background-color: ${({ theme }) => theme.colors.background100};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
`;

const SubTab = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;

  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text500};
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
