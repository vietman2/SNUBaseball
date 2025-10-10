import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import styled from "styled-components";

import { RootHeader } from "@widgets/header";
import { RootSidebar } from "@widgets/sidebar";
import { useUser } from "@entities/user";

const HEADER_HEIGHT = 60;
const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const { isAuthenticated, user } = useUser();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container>
      <RootHeader user={user} />
      <div className="root-contents">
        <RootSidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
        <Contents $isOpen={sidebarOpen}>
          <Outlet />
        </Contents>
      </div>
    </Container>
  );
}

const Container = styled.div`
  /* 뷰포트에 고정된 앱 셀 */
  height: 100vh;
  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.backgroundDefault};

  --header-height: ${HEADER_HEIGHT}px;
  --sidebar-width: ${SIDEBAR_WIDTH}px;
  --sidebar-collapsed-width: ${SIDEBAR_COLLAPSED_WIDTH}px;

  .root-contents {
    display: flex;
    height: calc(100vh - ${HEADER_HEIGHT}px);
  }
`;

interface Props {
  $isOpen: boolean;
}

const Contents = styled.div<Props>`
  /* 남은 공간을 전부 차지, 내부 스크롤 */
  flex: 1 1 auto;
  min-width: 0;
  overflow: auto;
`;
