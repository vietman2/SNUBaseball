import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Sidebar } from "@components/Sidebar";
import { useWindowSize } from "@hooks/useWindowSize";

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const { width } = useWindowSize();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getWidth = () => {
    if (width < 768) {
      if (isSidebarOpen) return "240px";
      return "20px";
    }
    return isSidebarOpen ? "240px" : "90px";
  };

  return (
    <MainContainer>
      <SidebarWrapper width={getWidth()}>
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </SidebarWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: 100dvh;
  overflow-x: auto;
  overflow-y: auto;
  user-select: none;
`;

const SidebarWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: ${({ width }) => width};
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: calc(100dvh - 32px);
  margin: 24px 24px 8px 0;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.lavender};
`;
