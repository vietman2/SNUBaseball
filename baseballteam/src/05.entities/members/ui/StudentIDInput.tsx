import styled from "styled-components";

import { useNameIDInput } from "../contexts/useNameIDInput";
import { WarningText } from "@shared/ui/Texts";

/**
 * 학번을 알고 있으면, 전체 학번을,
 * 그렇지 않으면 입학년도를 입력받는 input 컴포넌트
 * 훅으로 payload를 만들어 반환한다.
 */

export function StudentIDInput() {
  const { isFullID, toggleMode, setFullStudentID, setAdmissionYear } =
    useNameIDInput();

  return (
    <Container>
      {isFullID ? (
        <input
          type="text"
          name="student_id"
          onChange={(e) => setFullStudentID(e.target.value)}
          placeholder="학번 입력 (예: 2025-12345)"
          data-testid="student-id-input"
          required
        />
      ) : (
        <input
          type="number"
          name="admission_year"
          placeholder="입학년도 입력 (예: 2023)"
          required
          data-testid="admission-year-input"
          onChange={(e) => setAdmissionYear(Number(e.target.value))}
        />
      )}
      {!isFullID && (
        <WarningText>
          전체 학번을 입력하지 않으면, 사이트 가입이 불가합니다.
        </WarningText>
      )}
      <ToggleButton type="button" onClick={toggleMode} data-testid="toggle-button">
        {isFullID ? "입학년도만 입력" : "전체 학번 입력"}
      </ToggleButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;

  input {
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
    }
  }
`;

const ToggleButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
