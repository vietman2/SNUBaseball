import { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";

import { type SubTabType, type TabType } from "@shared/lib/router";
import { useColors } from "@shared/lib/styles";
import { AppIcon } from "@shared/ui/Icons";

interface Props {
  tab: TabType;
  isSidebarOpen: boolean;
  isActive: boolean;
  activeSubTab: SubTabType | null;
}

export function TabItem({
  tab,
  isSidebarOpen,
  isActive,
  activeSubTab,
}: Readonly<Props>) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { colors } = useColors();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const getContainerClassName = () => {
    if (isActive) return "active";
    if (isMenuOpen) return "open";
    return "";
  };

  useEffect(() => {
    if (isActive && tab.subtabs) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [isActive, tab]);

  return (
    <Container className={getContainerClassName()}>
      <div className="sidebar-tab-item-toprow">
        <TabWrapper to={tab.href} className={isSidebarOpen ? "" : "collapsed"}>
          <AppIcon
            icon={tab.icon}
            size={20}
            color={
              isActive || isMenuOpen ? colors.textPrimary : colors.textSecondary
            }
          />
          {isSidebarOpen && (
            <span className="sidebar-tab-item-title">{tab.title}</span>
          )}
        </TabWrapper>
        {tab.subtabs && isSidebarOpen && (
          <IconWrapper
            className={isMenuOpen ? "open" : ""}
            onClick={toggleMenu}
            data-testid={
              isMenuOpen
                ? `${tab.title}-submenu-collapse`
                : `${tab.title}-submenu-expand`
            }
          >
            <AppIcon
              icon="chevron-down"
              size={16}
              color={isActive ? colors.textPrimary : colors.gray600}
            />
          </IconWrapper>
        )}
      </div>
      {tab.subtabs && isSidebarOpen && (
        <SubTabMenu className={isMenuOpen ? "open" : ""}>
          {tab.subtabs.map((subtab) => (
            <SubTabItem
              to={subtab.href}
              key={subtab.href}
              className={activeSubTab?.href === subtab.href ? "active" : ""}
            >
              <span>{subtab.title}</span>
            </SubTabItem>
          ))}
        </SubTabMenu>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;

  border-radius: 8px;
  transition: all ease 0.3s;
  cursor: pointer;

  &.active {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.backgroundPaper};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  }

  &.open {
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.gray100};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }

  .sidebar-tab-item-toprow {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
  }
`;

const TabWrapper = styled(Link)`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0px 4px;
  gap: 12px;

  &.collapsed {
    justify-content: center;
    padding: 0;
  }
`;

const IconWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &.open {
    transform: rotate(180deg);
  }
`;

const SubTabMenu = styled.div`
  display: none;
  flex-direction: column;
  gap: 4px;

  color: ${({ theme }) => theme.colors.textSecondary};

  background-color: ${({ theme }) => theme.colors.surfaceElevated};
  border-radius: 0 0 8px 8px;
  border-top: 0.5px solid ${({ theme }) => theme.colors.divider};

  &.open {
    display: flex;
  }
`;

const SubTabItem = styled(Link)`
  padding: 8px 24px;

  &.active {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.backgroundPaper}75;
  }

  &.active:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
