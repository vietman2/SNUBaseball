import { useState } from "react";
import { Outlet } from "react-router";
import styled from "styled-components";

import { Header } from "./_header";
import { Sidebar } from "./_sidebar";

export function WideLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Header isSidebarOpen={isSidebarOpen} />
      <MainContainer>
        <ContentWrapper $isOpen={isSidebarOpen}>
          <Outlet />
        </ContentWrapper>
      </MainContainer>
    </div>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background100};
  width: 100%;
  height: 100dvh;
  overflow-x: auto;
  user-select: none;
`;

const ContentWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${({ $isOpen }) => ($isOpen ? "0 0 0 240px" : "0 0 0 90px")};

  transition: padding 0.3s ease-in-out;
`;
