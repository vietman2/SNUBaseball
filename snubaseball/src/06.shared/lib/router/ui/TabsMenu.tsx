"use client";

import "client-only";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

import { RouterTabs } from "../models/tabs";
import { hexToRgba } from "@shared/lib/styles";

export function TabsMenu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const openT = useRef<number | null>(null);
  const closeT = useRef<number | null>(null);
  const pathname = usePathname();

  const clearTimers = () => {
    if (openT.current) window.clearTimeout(openT.current);
    if (closeT.current) window.clearTimeout(closeT.current);
    openT.current = null;
    closeT.current = null;
  };

  const openMenu = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
    openT.current = window.setTimeout(() => setMenuOpen(true), 60);
  };

  const closeMenu = () => {
    if (openT.current) window.clearTimeout(openT.current);
    closeT.current = window.setTimeout(() => setMenuOpen(false), 120);
  };

  const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
    clearTimers();
    setMenuOpen(false);
  };

  useEffect(() => {
    // 페이지가 바뀌면 메뉴 닫기
    setMenuOpen(false);
    clearTimers();
  }, [pathname]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  return (
    <HoverZone
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      data-testid="tabs-menu-hoverzone"
    >
      <Container>
        {RouterTabs.map((tab) => (
          <Tab key={tab.label}>
            <Link
              href={tab.type === "SIMPLE" ? tab.href : tab.submenu[0].href}
              onClick={handleLinkClick}
              data-testid={`tab-${tab.label}`}
            >
              {tab.label}
            </Link>
          </Tab>
        ))}
      </Container>
      <Menu
        $isOpen={menuOpen}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
        data-testid="tabs-menu"
      >
        <div className="root-header-menu-void" />
        <SubTabs>
          {RouterTabs.map((tab) =>
            tab.type === "SUBMENU" ? (
              <div className="root-header-subtab" key={tab.label}>
                {tab.submenu.map((sub) => (
                  <div key={sub.href}>
                    <Link
                      href={sub.href}
                      onClick={handleLinkClick}
                      data-testid={`subtab-${sub.label}`}
                    >
                      {sub.label}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="root-header-subtab" key={tab.label} />
            )
          )}
        </SubTabs>
      </Menu>
    </HoverZone>
  );
}

const HoverZone = styled.div`
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  height: 64px;
`;

const Tab = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1rem;
  font-weight: 600;
`;

const Menu = styled.div<{ $isOpen: boolean }>`
  display: flex;
  padding: 16px 12.5%;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  border-top: 0.5px solid ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.gray100};
  box-shadow: 0px 4px 4px
    ${({ theme }) => hexToRgba(theme.colors.textPrimary, 0.1)};
  z-index: 100;

  transform: translateY(${({ $isOpen }) => ($isOpen ? "0" : "-8px")});
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: transform 0.2s ease, opacity 0.2s ease,
    visibility 0s linear ${({ $isOpen }) => ($isOpen ? "0s" : ".2s")};

  .root-header-menu-void {
    flex: 3;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px 7.5%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 4px 16px;
  }
`;

const SubTabs = styled.div`
  display: flex;
  flex: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 2.5;
  }

  .root-header-subtab {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.925rem;
    font-weight: 400;
  }
`;
