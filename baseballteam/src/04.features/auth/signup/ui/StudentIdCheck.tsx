import styled from "styled-components";

import { useSignupForm } from "../contexts/useSignupForm";
import { TextInput } from "@shared/ui/Inputs";

export function StudentIdCheck() {
  const { memberId, studentId, setStudentId, checkId } = useSignupForm();

  return (
    <StudentIdWrapper>
      <TextInput
        placeholder="학번"
        value={studentId}
        onChange={setStudentId}
        disabled={memberId !== -1}
      />
      <button onClick={checkId} disabled={memberId !== -1}>
        확인
      </button>
    </StudentIdWrapper>
  );
}
const StudentIdWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  input {
    flex: 1;
    max-width: 180px;
  }

  > button {
    width: 54px;
    padding: 12px 8px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background100};
    cursor: pointer;
  }

  > button:disabled {
    background-color: ${({ theme }) => theme.colors.gray500};
    color: ${({ theme }) => theme.colors.gray300};
    cursor: not-allowed;
  }
`;
