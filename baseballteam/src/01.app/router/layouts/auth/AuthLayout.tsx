import { Navigate, Outlet } from "react-router";
import styled from "styled-components";

import { useUser } from "@shared/lib/auth";
import { Logo } from "@shared/ui/Images";

export function AuthLayout() {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/home" replace />;
  }


return (
  <Container>
    <Box>
      <LogoImage src={Logo} alt="Logo" />
      <Outlet />
    </Box>
  </Container>
);
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 12px;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.background500};
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 24px;
`;
