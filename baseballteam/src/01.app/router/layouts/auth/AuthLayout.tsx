import { Navigate, Outlet } from "react-router";
import styled from "styled-components";

import { useUser } from "@entities/user";
import { Logo } from "@shared/ui/Icons";

export function AuthLayout() {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <Container>
      <Box>
        <Logo />
        <Outlet />
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray300};
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 36px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray100};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;
