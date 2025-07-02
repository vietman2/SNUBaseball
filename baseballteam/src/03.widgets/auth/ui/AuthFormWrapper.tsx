import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { useAuth } from "@shared/lib/auth";
import { Logo } from "@shared/ui/Images";

interface Props {
  children: React.ReactNode;
}

export function AuthFormWrapper({ children }: Readonly<Props>) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <Container>
      <Box>
        <LogoImage src={Logo} alt="Logo" />
        {children}
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
