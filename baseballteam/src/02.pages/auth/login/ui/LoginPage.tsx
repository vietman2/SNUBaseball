import styled from "styled-components";

import { LoginForm } from "@features/auth/login";
import { GoToSignupLink } from "@features/auth/signup";

/**
 * 폼을 작성하고 제출하고, 성공하면 토큰 수령.
 */

export function LoginPage() {
  return (
    <Container>
      <LoginForm />
      <GoToSignupLink />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
