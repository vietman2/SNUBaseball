import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Sidebar } from "@components/Sidebar";
import { palette } from "@colors/palette";

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <MainContainer>
      <SidebarWrapper $isOpen={isSidebarOpen}>
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
  background-color: ${palette.fullWhite};
  overflow-x: hidden;
`;

const SidebarWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: ${({ $isOpen }) => ($isOpen ? "240px" : "80px")};
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100vh;
  padding: 0 40px;
  overflow-x: hidden;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
`;
