import { Navigate, Outlet } from "react-router";
import styled from "styled-components";

import { useAuth } from "@shared/lib/auth";

export function RootLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background300};
  width: 100%;
  height: 100dvh;
  overflow-x: auto;
  user-select: none;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
