import { Navigate, Outlet } from "react-router";
import styled from "styled-components";

import { RootHeader } from "@widgets/header";
import { RootSidebar } from "@widgets/sidebar";
import { useUser } from "@entities/user";

export function MainLayout() {
  const { isAuthenticated, user } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container>
      <RootHeader user={user} />
      <div className="root-contents">
        <RootSidebar />
        <Outlet />
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundDefault};

  .root-contents {
    display: flex;
    max-width: 100vw;
  }
`;
