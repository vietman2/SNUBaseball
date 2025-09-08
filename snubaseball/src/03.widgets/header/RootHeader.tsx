"use client";

import styled from "styled-components";

import { HomeLogoLink } from "./ui/HomeLogoLink";
import { TabsMenu, TabsMobile } from "@shared/lib/router";

export function RootHeader() {
  return (
    <Container>
      <HomeLogoLink />
      <Title>서울대학교 야구부</Title>
      <WideLayoutWrapper>
        <TabsMenu />
      </WideLayoutWrapper>
      <MobileLayoutWrapper>
        <TabsMobile />
      </MobileLayoutWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 12.5%;

  position: relative;

  z-index: 10;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 8px 7.5%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 4px 16px;
  }
`;

const Title = styled.span`
  display: none;

  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }
`;

const WideLayoutWrapper = styled.div`
  display: flex;
  flex: 2;
  justify-content: flex-end;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 2.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MobileLayoutWrapper = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
`;
