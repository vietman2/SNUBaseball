import styled from "styled-components";

import {
  SignupForm,
  SignupFormProvider,
  StudentIdCheck,
} from "@features/auth/signup";

export function SignupPage() {
  return (
    <SignupFormProvider>
      <Container>
        <StudentIdCheck />
        <SignupForm />
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
