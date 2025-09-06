import { useMemo, useState } from "react";
import styled from "styled-components";

import { GoBackToLoginLink } from "@features/auth/login";
import {
  IdCheckForm,
  SignupForm,
  StudentIdCheckContext,
  type StudentIdCheckContextType,
} from "@features/auth/signup";

export function SignupPage() {
  const [memberId, setMemberId] = useState<number | null>(null);
  const [studentId, setStudentId] = useState<string>("");

  const value = useMemo<StudentIdCheckContextType>(
    () => ({
      memberId,
      setMemberId,
      studentId,
      setStudentId,
    }),
    [memberId, studentId]
  );

  return (
    <StudentIdCheckContext.Provider value={value}>
      <Container>
        <IdCheckForm />
        <SignupForm />
        <GoBackToLoginLink />
      </Container>
    </StudentIdCheckContext.Provider>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
