import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { login } from "../api/login";
import { useTokens } from "@shared/lib/auth";
import { useColors } from "@shared/lib/styles";
import { ElevatedTextButton } from "@shared/ui/Buttons";
import { Spinner } from "@shared/ui/Loading";

export function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const { colors } = useColors();
  const { setToken } = useTokens();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await login({ username, password });

    if (response.status !== "SUCCESS") {
      setError(response.message);
    } else {
      setToken(response.data.access);
      navigate("/home");
    }

    setLoading(false);
  };

  return (
    <Form onSubmit={submit} data-testid="login-form">
      <InputWrapper>
        <label htmlFor="username">아이디</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          data-testid="username-input"
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          data-testid="password-input"
        />
      </InputWrapper>
      {error && <p className="login-error">{error}</p>}
      <ElevatedTextButton
        type="submit"
        disabled={loading}
        $backgroundColor={colors.primary}
        $color={colors.onPrimary}
        data-testid="login-button"
      >
        {loading ? <Spinner size={18} color={colors.onPrimary} /> : "로그인"}
      </ElevatedTextButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;

  p.login-error {
    margin: 0;
    font-size: 0.875rem;
    text-align: right;
    color: ${({ theme }) => theme.colors.error};
  }

  > button {
    margin-top: 12px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  > label {
    flex: 1;
    text-align: right;
    font-size: 0.875rem;
    font-weight: 600;
  }

  > input {
    flex: 2;
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    border-radius: 4px;
    font-size: 0.875rem;
  }
`;
