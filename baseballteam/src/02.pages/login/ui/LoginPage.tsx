import styled from "styled-components";

import { LoginForm, LoginFormProvider } from "@features/auth/login";

export function LoginPage() {
  return (
    <LoginFormProvider>
      <Container>
        <LoginForm />
      </Container>
    </LoginFormProvider>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.background700};
`;
