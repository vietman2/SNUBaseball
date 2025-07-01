import styled from "styled-components";

import { AuthFormWrapper } from "@widgets/auth";
import {
  SignupForm,
  SignupFormProvider,
  StudentIdCheck,
} from "@features/auth/signup";

export function SignupPage() {
  return (
    <SignupFormProvider>
      <Container>
        <AuthFormWrapper>
          <StudentIdCheck />
          <SignupForm />
        </AuthFormWrapper>
      </Container>
    </SignupFormProvider>
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
