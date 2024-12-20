import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { VerticalDivider } from "@components/Dividers";
import { AppIcon } from "@components/Icons";
import { useAuth } from "@contexts/auth";
import { useTheme } from "@contexts/theme";
import { SubTabType } from "@navigation/tabs";
import { logout as logoutRequest } from "@services/auth";

interface HeaderProps {
  title: string;
  subtabs: SubTabType[];
  activeSubTab: SubTabType;
  setActiveSubtab: (subtab: SubTabType) => void;
}

export function Header({
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
          onMouseOver={showMenu}
          onMouseLeave={hideMenu}
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
