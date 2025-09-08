"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import { RouterTabs } from "../models/tabs";

export function TabsMenu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const openT = useRef<number | null>(null);
  const closeT = useRef<number | null>(null);

  const openMenu = () => {
    if (closeT.current) window.clearTimeout(closeT.current);
    openT.current = window.setTimeout(() => setMenuOpen(true), 60);
  };

  const closeMenu = () => {
    if (openT.current) window.clearTimeout(openT.current);
    closeT.current = window.setTimeout(() => setMenuOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (openT.current) window.clearTimeout(openT.current);
      if (closeT.current) window.clearTimeout(closeT.current);
    };
  }, []);

  return (
    <HoverZone onMouseEnter={openMenu} onMouseLeave={closeMenu} data-testid="tabs-menu-hoverzone">
      <Container>
        {RouterTabs.map((tab) => (
          <Tab key={tab.label}>
            <Link href={tab.type === "SIMPLE" ? tab.href : tab.submenu[0].href}>
              {tab.label}
            </Link>
          </Tab>
        ))}
      </Container>
      <Menu $isOpen={menuOpen} onMouseEnter={openMenu} onMouseLeave={closeMenu} data-testid="tabs-menu">
        <div className="root-header-menu-void" />
        <SubTabs>
          <div className="root-header-subtab">
            <Link href="/about">팀 소개</Link>
            <Link href="/history">팀 연혁</Link>
            <Link href="/members">선수 • 매니저</Link>
            <Link href="/staff">지도자</Link>
          </div>
          <div className="root-header-subtab" />
          <div className="root-header-subtab" />
          <div className="root-header-subtab">
            <Link href="/contact">문의하기</Link>
            <Link href="/support">후원 안내</Link>
          </div>
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
  font-size: 1rem;
  font-weight: 600;
`;

const Menu = styled.div<{ $isOpen: boolean }>`
  display: flex;
  padding: 16px 12.5%;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;

  border-top: 0.5px solid ${({ theme }) => theme.colors.gray200};
  background-color: ${({ theme }) => theme.colors.gray100};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;

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

  .root-header-subtab {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    font-size: 0.925rem;
    font-weight: 400;
  }
`;
