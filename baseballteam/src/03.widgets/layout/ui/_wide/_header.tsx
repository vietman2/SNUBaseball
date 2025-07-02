import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { useAuth } from "@shared/lib/auth";
import { useColors } from "@shared/lib/colors";
import { useTabs, type SubTabType } from "@shared/lib/navigation";
import { VerticalDivider } from "@shared/ui/Dividers";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  isSidebarOpen: boolean;
}

export function Header({ isSidebarOpen }: Readonly<Props>) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { activeTab, activeSubTab } = useTabs();
  const { user } = useAuth();
  const { colors, isDarkMode, toggleTheme } = useColors();
  const navigate = useNavigate();

  const showMenu = () => {
    setMenuOpen(true);
  };

  const hideMenu = () => {
    setMenuOpen(false);
  };

  const handleSubTabClick = (subtab: SubTabType) => {
    navigate(subtab.path);
  };

  const goToProfilePage = () => {
    navigate("/profile");
  };

  return (
    <Container $isOpen={isSidebarOpen}>
      <Horizontal>
        <h1>{activeTab.title}</h1>
        <VerticalDivider height="36px" bold />
        <Tabs>
          {activeTab.subtabs.map((subtab) => (
            <Tab
              key={subtab.title}
              $active={activeSubTab === subtab}
              onClick={() => handleSubTabClick(subtab)}
              data-testid={subtab.title}
            >
              {subtab.title}
            </Tab>
          ))}
        </Tabs>
      </Horizontal>
      <Horizontal>
        <IconWrapper onClick={toggleTheme} data-testid="toggle-theme">
          {isDarkMode ? (
            <AppIcon icon="moon" color={colors.primary} size={20} />
          ) : (
            <AppIcon icon="sun" color={colors.primary} size={20} />
          )}
        </IconWrapper>
        <VerticalDivider height="24px" />
        <MenuContainer
          onMouseOver={showMenu}
          onMouseOut={hideMenu}
          data-testid="header-menu"
        >
          <div>
            {user?.profile_image ? (
              <img src={user?.profile_image} alt="avatar" />
            ) : (
              <AppIcon icon="person" size={20} />
            )}
            <span>{user?.name}</span>
          </div>
          <Menu style={{ display: menuOpen ? "block" : "none" }}>
            <MenuItem onClick={goToProfilePage}>내 프로필</MenuItem>
          </Menu>
        </MenuContainer>
      </Horizontal>
    </Container>
  );
}

const Container = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  max-height: 64px;
  padding: ${({ $isOpen }) => ($isOpen ? "0 24px 0 240px" : "0 24px 0 90px")};

  position: sticky;
  top: 0;
  z-index: 1;

  border-bottom: 0.5px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.background100};

  transition: padding 0.3s ease-in-out;
`;

const Horizontal = styled.div`
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
    $active ? theme.colors.primary : theme.colors.text900};

  transition: background-color 0.3s ease-in-out;
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  cursor: pointer;
`;
