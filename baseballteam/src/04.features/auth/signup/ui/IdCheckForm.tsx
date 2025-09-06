import styled from "styled-components";

import { checkStudentId } from "../api/idCheck";
import { useStudentIdCheck } from "../contexts/useStudentIdCheck";

export function IdCheckForm() {
  const { memberId, setMemberId, studentId, setStudentId } =
    useStudentIdCheck();

  const checkId = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (studentId.length === 0) {
      window.alert("학번을 입력해주세요.");
      return;
    }

    const result = await checkStudentId({ student_id: studentId });
    if (result.status === "SUCCESS") {
      setMemberId(result.data.member_id);
      window.alert(`${result.data.name} 가입 가능합니다.`);
    } else {
      window.alert(result.message);
    }
  };

  return (
    <Form onSubmit={checkId}>
      <input
        placeholder="학번"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        disabled={memberId !== null}
        data-testid="student-id-input"
      />
      <button type="submit" disabled={memberId !== null}>
        확인
      </button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  font-size: 0.875rem;

  input {
    flex: 1;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray500};
    }
  }

  > button {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.gray100};
    cursor: pointer;

    &:disabled {
      background-color: ${({ theme }) => theme.colors.gray500};
      color: ${({ theme }) => theme.colors.gray300};
      cursor: not-allowed;
    }
  }
`;
