import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { signup } from "../api/register";
import { useStudentIdCheck } from "../contexts/useStudentIdCheck";
import { useColors } from "@shared/lib/styles";
import { ElevatedTextButton } from "@shared/ui/Buttons";

export function SignupForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const { memberId, studentId } = useStudentIdCheck();
  const { colors } = useColors();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signup({
      member: memberId!,
      student_id: studentId,
      username,
      password,
      password2: passwordConfirm,
    });

    if (result.status === "SUCCESS") {
      window.alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={submit} data-testid="signup-form">
      <input
        id="username"
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        data-testid="username-input"
      />
      <input
        id="password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        data-testid="password-input"
      />
      <input
        id="password-confirm"
        type="password"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
        data-testid="password-confirm-input"
      />
      {error && <p className="signup-error">{error}</p>}
      <ElevatedTextButton
        type="submit"
        disabled={loading}
        $backgroundColor={colors.primary}
        $color={colors.onPrimary}
        data-testid="signup-button"
      >
        회원가입
      </ElevatedTextButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4px;

  > input {
    min-width: 220px;
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 4px;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray900};

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray500};
    }
  }

  p.signup-error {
    margin: 0;
    font-size: 0.875rem;
    text-align: right;
    color: ${({ theme }) => theme.colors.error};
  }

  > button {
    margin-top: 12px;
  }
`;
