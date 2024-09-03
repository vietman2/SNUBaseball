import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Sidebar } from "@components/Sidebar";

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
  flex-direction: row;
  width: 100%;
  background-color: #f0f0f0;
  overflow-x: hidden;
`;

const SidebarWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: ${({ $isOpen }) => ($isOpen ? "240px" : "90px")};
  height: 100vh;
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 20px;
  overflow-x: hidden;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
`;
